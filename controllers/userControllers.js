const Utilisateur = require("../models/user/user");
const Patient = require("../models/patient");
const Medecin = require("../models/medecin");
const Infirmier = require("../models/infirmier");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const ObjectId = require("mongodb").ObjectId;


// Enregistrement d'un utilisateur (Patient/ Medecin/ Infirmier)
const enregistrerUtilisateur = async ( req, res ) => {

    try{
        // Vérifier si l'email ou le numéro de téléphone existe déjà
        const data = req.body;

        const existingEmail = await Utilisateur.findOne({ email: data.email });
        const existingPhone = await Utilisateur.findOne({ telephone: data.telephone });
        const mot_de_passe_present = data.motDePasse;

        if( existingEmail ){
            return res.status(400).json({ Message: "Cet email existe déjà. Veuillez saisir un autre email." });
        }

        if( existingPhone ){
            return res.status(401).json({ Message: "Cet numéro de téléphone appartient déjà à un utilisateur. Veuillez renseigner un autre numéro." });
        }

        if( !mot_de_passe_present ){
            return res.status(402).json({ Message: "Le mot de passe est requis" });
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
            role: data.role };
        
        // Création du nouvel utilisateur
        const new_user = new Utilisateur(user_data);

        // Sauvegarde du nouvel utilisateur dans la base de données
        await new_user.save();
        

        if( data.role === "Patient" ){

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
        else if( data.role === "Medecin" ){

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
        else if( data.role === "Infirmier" ){

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
        res.status(500).json({ Message: "Erreur d'enregistrement", Error: error.message})
    }

};


// Obtention de la liste des utilisateurs en attente
const getUtilisateursEnAttente = async (req, res) => {

    try {
        // Recherche de tous les utilisateurs dont le statutValidation est "En attente"
        const utilisateurs = await Utilisateur.find({ statutValidation: "En attente" });

        // Vérification si aucun utilisateur n'est en attente
        if (utilisateurs.length === 0) {
            return res.status(404).json({ Message: "Aucun utilisateur en attente." });
        }

        // Retour de la liste des utilisateurs en attente
        res.status(200).json({ Message: "Voici la liste des utilisateurs en attente: ", utilisateurs});

    } catch (error) {
        res.status(500).json({ Message: "Erreur lors de la récupération des utilisateurs en attente.", Error: error.message });
    }

};


// Obtention des infos d'un utilisateur a travers son ID
const getUtilisateurById = async (req, res) => {

    try {
        // Recupere l'id de l'utilisateur dans les parametres de la requete
        const { id } = req.params;

        // Vérification si l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ Message: "ID invalide." });
        }

        // Trouve l'utilisateur par ID
        const utilisateur = await Utilisateur.findById(id);

        // Vérifie si l'utilisateur existe et si son statut de validation est "En attente"
        if (!utilisateur || utilisateur.statutValidation !== "En attente") {
            return res.status(404).json({ Message: "Utilisateur non trouvé." });
        }

        // Déclaration d'objet qui contiendra les détails supplémentaires en fonction du rôle de l'utilisateur
        let detailsSupplementaires = {};

        // Récupère les informations complémentaires si l'utilisateur est un PATIENT
        if (utilisateur.role === "Patient") {

            // Recherche un patient ayant comme `idUtilisateur` l'ID fourni
            const patient = await Patient.findOne({ idUtilisateur: id });

            if (patient) {

                // Stocke les détails supplémentaires du patient dans `detailsSupplementaires`
                detailsSupplementaires = {
                    dateNaissance: patient.dateNaissance, 
                    adresse: patient.adresse, 
                    groupeSanguin: patient.groupeSanguin, 
                    allergiesConnues: patient.allergiesConnues, 
                    situationMatrimoniale: patient.situationMatrimoniale, 
                    contactUrgence: patient.contactUrgence,
                    electroPhorese: patient.electroPhorese,
                    idUtilisateur: patient.idUtilisateur
                };

            }
        }

        // Récupère les informations complémentaires si l'utilisateur est un MEDECIN
        if (utilisateur.role === "Medecin") {

            // Recherche un medecin ayant comme `idUtilisateur` l'ID fourni
            const medecin = await Medecin.findOne({ idUtilisateur: id });

            if (medecin) {

                // Stocke les détails supplémentaires du medecin dans `detailsSupplementaires`
                detailsSupplementaires = {
                    specialite: medecin.specialite,
                    numeroLicence: medecin.numeroLicence,
                    signature: medecin.signature,
                    idUtilisateur: medecin.idUtilisateur
                };

            }
        }

        // Récupère les informations complémentaires si l'utilisateur est un INFIRMIER
        if (utilisateur.role === "Infirmier") {

            // Recherche un infirmier ayant comme `idUtilisateur` l'ID fourni
            const infirmier = await Infirmier.findOne({ idUtilisateur: id });

            if (infirmier) {

                // Stocke les détails supplémentaires de l'infirmier dans `detailsSupplementaires`
                detailsSupplementaires = {
                    serviceAffectation: infirmier.serviceAffectation,
                    idUtilisateur: infirmier.idUtilisateur
                };

            }
        }

        // Envoie une réponse sur les informations de l'utilisateur convertit en objet JS et les détails supplémentaires récupérés
        res.status(200).json({ Message: "Détails de l'utilisateur: ", ...utilisateur.toObject(), detailsSupplementaires });

    } catch (error) {
        res.status(500).json({ Message: "Erreur lors de la récupération de l'utilisateur.", Error: error.message });
    }

};


//Generation d'un jeton après connexion de l'utilisateur
const generateJwt= (identity) =>{
    try {

        if (!process.env.JWT_SECRET) {
            throw new Error("Clé JWT non définie dans le fichier .env");
        }

        // {identity} si je veux tout envoyé
        const token = jwt.sign(
            { identity }, 
            process.env.JWT_SECRET, 
            { expiresIn: "12h" }
        );
  
        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 12);
  
        return {
            token,
            expiresIn: "12h",
            expirationTime
        };
    }
    catch (error) {
        console.error("Erreur lors de la génération du token:", error.message);
        throw error; // ← très important pour ne pas retourner undefined
    }
};


// Connexion de l'utilisateur 
const userConnected = async (req, res) => {

    try {

        // Recuperer l'email et le mot de passe depuis le corps de la requete
        const { email, motDePasse} = req.body;

        // Verifier si l'email existe dans la base de données
        const utilisateur = await Utilisateur.findOne({email});

        if (!utilisateur) {
            return res.status(400).json({ Message: "L'email est invalide" });
        }
        
        // Comparer le mot de passe fourni avec le mot de passe stocké dans la base de données
        const mot_de_passe_correct = await bcrypt.compare(motDePasse, utilisateur.motDePasse);

        if (!mot_de_passe_correct) {
            return res.status(400).json({ Message: "Le mot de passe est incorrect. Veuillez réessayer!"});
        }

        // Verifier si le statut de validation du compte est "Valider"
        if ( utilisateur.statutValidation !== "Validé") {
            return res.status(404).json({ Message: "Votre compte n'est pas validé"});
        }

        // console.log("Utilisateur:", utilisateur);

        const categorie = utilisateur.role;
        // console.log("Role de l'utilisateur:", categorie);

        const return_token = generateJwt(utilisateur);

        // console.log("Data",return_token);

        const ajouter_par = await Utilisateur.findById(utilisateur.ajoutePar);
        
        let professionnel = null;

        if( ajouter_par ){

            professionnel = {
                _id: ajouter_par._id,
                nom: ajouter_par.nom,
                prenom: ajouter_par.prenom,
                role: ajouter_par.role
            }
            
        }

        res.status(200).json({ 
            message: "Connexion réussie", 
            data:return_token, 
            utilisateur: {   
                _id: utilisateur._id, 
                nom: utilisateur.nom, 
                prenom: utilisateur.prenom,
                email: utilisateur.email,
                telephone: utilisateur.telephone,
                sexe: utilisateur.sexe,
                statutValidation: utilisateur.statutValidation 
            }, 
            Rôle_utilisateur: categorie, 
            ajouterPar: professionnel
        });

    }
    catch (error) {
        res.status(500).json({ Message: "Erreur lors de la connexion", Error: error.message});
    }
}
  


module.exports = {enregistrerUtilisateur, getUtilisateursEnAttente, getUtilisateurById, userConnected};