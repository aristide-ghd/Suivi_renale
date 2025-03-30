const Utilisateur = require("../models/user/user");
const Patient = require("../models/patient");
const Medecin = require("../models/medecin");
const Infirmier = require("../models/infirmier");
const bcrypt = require("bcryptjs");
const ObjectId = require("mongodb").ObjectId;
const {sendEmail} = require("../utils/emailServices");


// Enregistrement d'un utilisateur (Patient/ Medecin/ Infirmier)
const enregistrerUtilisateur = async ( res, req ) => {

    try{
        // Vérifier si l'email ou le numéro de téléphone existe déjà
        const data = req.body;

        const existingEmail = await Utilisateur.findOne({ email: data.email });
        const existingPhone = await Utilisateur.findOne({ telephone: data.telephone });

        if( existingEmail ){
            res.status(200).json({ Message: "Cet email existe déjà. Veuillez saisir un autre email." });
        }

        if( existingPhone ){
            res.status(200).json({ Message: "Cet numéro de téléphone appartient déjà à un utilisateur. Veuillez renseigner un autre numéro." });
        }
        
        // Cryptage du mot de passe utilisateur
        const password = await bcrypt.hash( data.motDePasse, 10 );

        // Recuperation des données de l'utilisateur
        const user_data = { 
            nom: data.nom,
            prenom: data.prenom, 
            email: data.email, 
            motDePasse: password, 
            telephone: data.telephone, 
            sexe: data.sexe, 
            role: data.role, 
            statutValidation: "En attente" };
        
        // Création du nouvel utilisateur
        const new_user = new Utilisateur(user_data);

        // Sauvegarde du nouvel utilisateur dans la base de données
        await new_user.save();
        

        if( role === "Patient" ){

            // Recuperation des donnnées complémentaires du patient
            const patient_data = { 
                dateNaissance: data.dateNaissance, 
                adresse: data.adresse, 
                groupeSanguin: data.groupeSanguin, 
                allergiesConnues: data.allergiesConnues, 
                situationMatrimoniale: data.situationMatrimoniale, 
                contactUrgence: data.contactUrgence,
                electroPhorese: data.electroPhorese, 
                idUtilisateur: new_user._id };

            // Creation du nouveau patient
            const new_patient = new Patient(patient_data);

            // Sauvegarde du nouveau patient dans la base de données
            await new_patient.save();
            
        }
        else if( role === "Medecin"){

            // Recuperation des donnees complementaires du medecin
            const medecin_data = { 
                specialite: data.specialite, 
                numeroLicence: data.numeroLicence, 
                signature: data.signature, 
                idUtilisateur: new_user._id };
            
            // Creation du nouveau medecin
            const new_medecin = new Medecin(medecin_data);

            // Sauvegarde du nouveau medecin dans la base de données
            await new_medecin.save();

        }
        else if(role === "Infirmier(ère)"){

            // Recuperation des infos complementaires de l'infirmier/ère
            const infirmier_data = { 
                serviceAffectation: data.serviceAffectation, 
                idUtilisateur: new_user._id };

            // Creation du nouvel infirmier
            const new_infirmier = new Infirmier(infirmier_data);

            // Sauvegarde de l'infirmier dans la base de données
            await new_infirmier.save();
        }


        res.status(200).json({ Message: "Utilisateur enregistré avec succès. En attente de validation! "});
    }
    catch(error) {
        res.status(400).json({ Message: "Erreur d'enregistrement"})
    }

};


// Validation d'un patient par l'administrateur
const validerPatient = async ( req, res ) => {

    try {
        // Récupère l'ID du patient à partir des paramètres de la requête
        const { id } = req.params;

        // Vérifier si l'ID est un ObjectId valide
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ Message: "ID invalide." });
        }

        // Recherche un utilisateur dans la base de données avec l'ID fourni
        const patient = await Utilisateur.findById(id);

        // Vérifie si l'utilisateur existe et s'il a bien le rôle "Patient"
        if(!patient || patient.role !== "Patient"){
            return res.status(400).json({ Message: "Patient non trouvé" });
        }

        // Changement du champ statutValidation du patient quand il est trouvé
        patient.statutValidation = "Validé";

        // Modification et sauvegarde du champ statutValidation dans Utilisateur
        await patient.save();

        // Envoi d'un email au patient pour lui confirmer que son compte a été validé.
        // Utilisation de la fonction sendEmail importé depuis un autre fichier
        await sendEmail(patient.email, 
            "Validation de votre compte sur CKDTracker", 

            //Utilisation des backticks pour traiter les paragraphes comme une seule chaine de caratère
            ` 
            <p>Votre compte patient a été validée avec succès</p>,
            <p>Vous pouvez maintenant vous connecter en cliquant le lien ci-dessous:</p>,
            <a href="https://notresite.com/connexion">Se connecter</a>,
            <p>Si vous avez des questions, n'hésitez pas a nous contactez.</p>
            
            `
        );

        res.status(201).json({ Message: "Patient validée avec succès" });
    }
    catch(error) {
        res.status(400).json({ Message: "Erreur lors de la validation du patient"});
    }

};


module.exports = {enregistrerUtilisateur, validerPatient};