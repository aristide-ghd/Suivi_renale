const Utilisateur = require("../models/user/user");
const Patient = require("../models/patient");
const Medecin = require("../models/medecin");
const Infirmier = require("../models/infirmier");
const mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectId;
const {sendEmail} = require("../utils/emailServices");

// Validation d'un patient par l'administrateur
const validerPatient = async ( req, res ) => {

    try {
        // Récupère l'ID du patient à partir des paramètres de la requête
        const { id } = req.params;

        // Vérifier si l'ID est un ObjectId valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ Message: "L´ID est invalide." });
        }

        // Recherche un utilisateur dans la base de données avec l'ID fourni
        const patient = await Utilisateur.findById(id);

        // Vérifie si l'utilisateur existe et s'il a bien le rôle "Patient"
        if(!patient || patient.role !== "Patient"){
            return res.status(404).json({ Message: "Patient(e) non trouvé" });
        }

        // Changement du champ statutValidation du patient quand il est trouvé
        patient.statutValidation = "Validé";

        // Modification et sauvegarde du champ statutValidation dans Utilisateur
        await patient.save();

        const lien_connexion = `https://notresite.com/connexion`;

        const lien_contact = `mailto:aristidegbohaida@gmail.com`;

        // Message a envoyer par email
        //Utilisation des backticks pour traiter les paragraphes comme une seule chaine de caratère
        const messageHTML = 
        `   <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #4CAF50;">Validation de votre inscription</h2>
                
                <p>Bonjour <strong>${patient.prenom} ${patient.nom}</strong>,</p>
                
                <p>Votre compte <strong>Patient</strong> a été <strong>validé avec succès</strong>.</p>
                
                <p>Vous pouvez a present vous connecter en cliquant le bouton ci-dessous</p>

                <div style="text-align: center; margin: 20px 0;">
                    <a href="${lien_connexion}" 
                    style="display: inline-block; padding: 12px 20px; font-size: 16px; color: white; background-color: #4CAF50; 
                    text-decoration: none; border-radius: 5px;">
                        Se connecter
                    </a>
                </div>
                
                <p>Si vous avez des questions, contactez-nous à : <a href="${lien_contact}">aristidegbohaida@gmail.com</a>.</p>
                
                <p style="font-size: 12px; color: #777;">Ceci est un message automatique, merci de ne pas répondre.</p>
            </div> ` ;

        // Envoi d'un email au patient pour lui confirmer que son compte a été validé.
        // Utilisation de la fonction sendEmail importé depuis un autre fichier
        await sendEmail(patient.email, "Validation de votre inscription sur CKDTracker", messageHTML );

        const ajouter_par = await Utilisateur.findById(patient.ajoutePar);

        let professionnel = null;

        if( ajouter_par ){

            professionnel = {
                _id: ajouter_par._id,
                nom: ajouter_par.nom,
                prenom: ajouter_par.prenom,
                role: ajouter_par.role
            }
            
        }

        res.status(200).json({ Message: "Compte Patient validée avec succès", ajoutePar: professionnel });

    }
    catch(error) {
        res.status(500).json({ Message: "Erreur lors de la validation du compte Patient", Error: error.message });
    }

};


// Validation d'un medecin par l'administrateur
const validerMedecin = async(req, res) => {
    
    try{
        //Recupere l'id du medecin a partir des parametres de la requete
        const { id } = req.params;
        const { action, motifRejet } = req.body;

        // Vérifier si l'ID est un ObjectId valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ Message: "ID invalide." });
        }

        // Recherche un utilisateur dans la base de données avec l'ID fourni
        const utilisateur = await Utilisateur.findById(id);

        // Vérifie si l'utilisateur existe et s'il a bien le rôle "Medecin"
        if(!utilisateur || utilisateur.role !== "Medecin"){
            return res.status(404).json({ Message: "Médecin non trouvé" });
        }

        // let medecin = await Medecin.findOne({ utilisateur: id });
        // if (!medecin || !medecin.numeroLicence) {
        //     return res.status(400).json({ message: "Informations professionnelles incomplètes." });
        // }


        if ( action === "Rejeter") {
            
            if(!motifRejet) {
                return res.status(400).json({ Message: "Le motif du rejet est requis"});
            }

            // Changement du champ statutValidation du medecin quand il est rejeté
            utilisateur.statutValidation = "Rejeté"

            // Modification et sauvegarde du champ statutValidation dans Utilisateur
            await utilisateur.save();

            const lien_contact = `mailto:aristidegbohaida@gmail.com`;
            
            const messageHTML = 
        `   <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: red;">Rejet de votre inscription</h2>
                
                <p>Bonjour <strong>${utilisateur.prenom} ${utilisateur.nom}</strong>,</p>
                
                <p>Votre compte <strong>Medecin</strong> a été <strong>rejeté pour la raison suivante: </strong>.</p>
                
                <div style="text-align: center; margin: 20px 0;">
                    <strong>${motifRejet}</strong>
                </div>
                
                <p>Si vous avez des questions, contactez-nous à : <a href="${lien_contact}">aristidegbohaida@gmail.com</a>.</p>
                
                <p style="font-size: 12px; color: #777;">Ceci est un message automatique, merci de ne pas répondre.</p>
            </div> ` ;


            // Envoi d'un email au medecin pour l'informer que son compte a été rejeté.
            await sendEmail(utilisateur.email, "Rejet de votre inscription sur CKDTracker", messageHTML);

            return res.status(200).json({ Message: "Compte Medecin rejeté avec succès", Raison: motifRejet});
        }

        // Changement du champ statutValidation du medecin quand il est accepté
        utilisateur.statutValidation = "Validé";

        // Modification et sauvegarde du champ statutValidation dans Utilisateur
        await utilisateur.save();

        const lien_connexion = `https://notresite.com/connexion`;

        const lien_contact = `mailto:aristidegbohaida@gmail.com`;

        const messageHTML = 
        `   <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #4CAF50;">Validation de votre inscription</h2>
                
                <p>Bonjour <strong>${utilisateur.prenom} ${utilisateur.nom}</strong>,</p>
                
                <p>Votre compte <strong>Medecin</strong> a été <strong>validé avec succès</strong>.</p>

                <p>Vous pouvez a present vous connecter en cliquant le bouton ci-dessous</p>
                
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${lien_connexion}" 
                    style="display: inline-block; padding: 12px 20px; font-size: 16px; color: white; background-color: #4CAF50; 
                    text-decoration: none; border-radius: 5px;">
                        Se connecter
                    </a>
                </div>
                
                <p>Si vous avez des questions, contactez-nous à : <a href="${lien_contact}">aristidegbohaida@gmail.com</a>.</p>
                
                <p style="font-size: 12px; color: #777;">Ceci est un message automatique, merci de ne pas répondre.</p>
            </div> ` ;


        // Envoi d'un email au medecin pour lui confirmer que son compte a été validé.
        // Utilisation de la fonction sendEmail importé depuis un autre fichier
        await sendEmail(utilisateur.email, "Validation de votre inscription sur CKDTracker", messageHTML );

        res.status(200).json({ Message: "Compte Médecin validée avec succès"});
    }
    catch(error) {
        res.status(500).json({ Message: "Erreur lors de la validation du compte Médecin", Error: error.message});
    }
};


// Validation d'un infirmier par l'administrateur
const validerInfirmier = async(req, res) => {
    
    try{
        //Recupere l'id du medecin a partir des parametres de la requete
        const { id } = req.params;
        const { action, motifRejet } = req.body;

        // Vérifier si l'ID est un ObjectId valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ Message: "ID invalide." });
        }

        // Recherche un utilisateur dans la base de données avec l'ID fourni
        const utilisateur = await Utilisateur.findById(id);

        // Vérifie si l'utilisateur existe et s'il a bien le rôle "Medecin"
        if(!utilisateur || utilisateur.role !== "Infirmier"){
            return res.status(404).json({ Message: "Infirmier(ère) non trouvé" });
        }

        if ( action === "Rejeter") {

            if(!motifRejet) {
                return res.status(400).json({ Message: "Le motif du rejet est requis"});
            }

            // Changement du champ statutValidation de l'infirmier quand il est rejeté
            utilisateur.statutValidation = "Rejeté"

            // Modification et sauvegarde du champ statutValidation dans Utilisateur
            await utilisateur.save();

            const lien_contact = `mailto:aristidegbohaida@gmail.com`;

            const messageHTML = 
            `   <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: red;">Rejet de votre inscription</h2>
                    
                    <p>Bonjour <strong>${utilisateur.prenom} ${utilisateur.nom}</strong>,</p>
                    
                    <p>Votre compte <strong>Infirmier</strong> a été <strong>rejeté pour la raison suivante: </strong>.</p>
                    
                    <div style="text-align: center; margin: 20px 0;">
                        <strong>${motifRejet}</strong>
                    </div>
                    
                    <p>Si vous avez des questions, contactez-nous à : <a href="${lien_contact}">aristidegbohaida@gmail.com</a>.</p>
                    
                    <p style="font-size: 12px; color: #777;">Ceci est un message automatique, merci de ne pas répondre.</p>
                </div> ` ;


            // Envoi d'un email a l'infirmier(ère) pour l'informer que son compte a été rejeté.
            await sendEmail(utilisateur.email, "Rejet de votre inscription sur CKDTracker", messageHTML);

            return res.status(200).json({ Message: "Compte Infirmier rejeté avec succès", Raison: motifRejet});

        }

        // Changement du champ statutValidation de l'infirmier(ère) quand il(elle) a fourni des informations justes
        utilisateur.statutValidation = "Validé";

        // Modification et sauvegarde du champ statutValidation dans Utilisateur
        await utilisateur.save();

        const lien_contact = `mailto:aristidegbohaida@gmail.com`;

        const lien_connexion = `https://notresite.com/connexion`;

        const messageHTML = 
        `   <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #4CAF50;">Validation de votre inscription</h2>
                
                <p>Bonjour <strong>${utilisateur.prenom} ${utilisateur.nom}</strong>,</p>
                
                <p>Votre compte <strong>Infirmier</strong> a été <strong>validé avec succès</strong>.</p>

                <p>Vous pouvez a present vous connecter en cliquant le bouton ci-dessous</p>
                
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${lien_connexion}" 
                    style="display: inline-block; padding: 12px 20px; font-size: 16px; color: white; background-color: #4CAF50; 
                    text-decoration: none; border-radius: 5px;">
                        Se connecter
                    </a>
                </div>
                
                <p>Si vous avez des questions, contactez-nous à : <a href="${lien_contact}">aristidegbohaida@gmail.com</a>.</p>
                
                <p style="font-size: 12px; color: #777;">Ceci est un message automatique, merci de ne pas répondre.</p>
            </div> ` ;


        // Envoi d'un email a l'infirmier(ère) pour lui confirmer que son compte a été validé.
        // Utilisation de la fonction sendEmail importé depuis un autre fichier
        await sendEmail(utilisateur.email, "Validation de votre compte sur CKDTracker", messageHTML);

        res.status(200).json({ Message: "Compte Infirmier(ère) validée avec succès"});
    }
    catch(error) {
        res.status(500).json({ Message: "Erreur lors de la validation du compte Infirmier(ère)", Error: error.message});
    }
};



module.exports = {validerPatient, validerMedecin, validerInfirmier};