const Utilisateur = require("../models/user/user");
const Patient = require("../models/patient");
const Medecin = require("../models/medecin");
const Infirmier = require("../models/infirmier");
const ObjectId = require("mongodb").ObjectId;
const {sendEmail} = require("../utils/emailServices");

// Validation d'un patient par l'administrateur
const validerPatient = async ( req, res ) => {

    try {
        // Récupère l'ID du patient à partir des paramètres de la requête
        const { id } = req.params;

        // Vérifier si l'ID est un ObjectId valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ Message: "ID invalide." });
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

        // Envoi d'un email au patient pour lui confirmer que son compte a été validé.
        // Utilisation de la fonction sendEmail importé depuis un autre fichier
        await sendEmail(patient.email, 
            "Validation de votre inscription sur CKDTracker", 

            //Utilisation des backticks pour traiter les paragraphes comme une seule chaine de caratère
            ` 
            <p>Votre compte patient a été validée avec succès</p>
            <p>Vous pouvez maintenant vous connecter en cliquant le lien ci-dessous:</p>
            <a href="https://notresite.com/connexion">Se connecter</a>
            <p>Si vous avez des questions, n'hésitez pas a nous contactez.</p>
            
            `
        );

        res.status(200).json({ Message: "Compte <strong>Patient</strong> validée avec succès" });
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

        if ( action === "Rejeter") {
            // Changement du champ statutValidation du medecin quand il est rejeté
            utilisateur.statutValidation = "Rejeté"

            // Modification et sauvegarde du champ statutValidation dans Utilisateur
            await utilisateur.save();

            // Envoi d'un email au medecin pour l'informer que son compte a été rejeté.
            await sendEmail(utilisateur.email,
                "Rejet de votre inscription sur CKDTracker",

                `
                <p>Votre compte <strong>Medecin</strong> a été rejeté pour la raison suivante:</p>
                <p><strong>${motifRejet}</strong></p>  
                
                `
            );

            return res.status(200).json({ Message: "Compte <strong>Medecin</strong> rejeté avec succès"});
        }

        // Changement du champ statutValidation du medecin quand il est accepté
        utilisateur.statutValidation = "Validé";

        // Modification et sauvegarde du champ statutValidation dans Utilisateur
        await utilisateur.save();

        // Envoi d'un email au medecin pour lui confirmer que son compte a été validé.
        // Utilisation de la fonction sendEmail importé depuis un autre fichier
        await sendEmail(utilisateur.email, 
            "Validation de votre inscription sur CKDTracker", 

            //Utilisation des backticks pour traiter les paragraphes comme une seule chaine de caratère
            ` 
            <p>Votre compte <strong>Medecin</strong> a été validée avec succès</p>,
            <p>Vous pouvez maintenant vous connecter en cliquant le lien ci-dessous:</p>,
            <a href="https://notresite.com/connexion">Se connecter</a>,
            <p>Si vous avez des questions, n'hésitez pas a nous contactez.</p>
            
            `
        )

        res.status(200).json({ Message: "Compte <strong>Médecin</strong> validée avec succès"});
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

        // Vérifier si l'ID est un ObjectId valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ Message: "ID invalide." });
        }

        // Recherche un utilisateur dans la base de données avec l'ID fourni
        const infirmier = await Utilisateur.findById(id);

        // Vérifie si l'utilisateur existe et s'il a bien le rôle "Medecin"
        if(!infirmier || infirmier.role !== "Infirmier"){
            return res.status(404).json({ Message: "Infirmier(ère) non trouvé" });
        }

        // Changement du champ statutValidation du patient quand il est trouvé
        infirmier.statutValidation = "Validé";

        // Modification et sauvegarde du champ statutValidation dans Utilisateur
        await infirmier.save();

        // Envoi d'un email au patient pour lui confirmer que son compte a été validé.
        // Utilisation de la fonction sendEmail importé depuis un autre fichier
        await sendEmail(infirmier.email, 
            "Validation de votre compte sur CKDTracker", 

            //Utilisation des backticks pour traiter les paragraphes comme une seule chaine de caratère
            ` 
            <p>Votre compte infirmier a été validée avec succès</p>,
            <p>Vous pouvez maintenant vous connecter en cliquant le lien ci-dessous:</p>,
            <a href="https://notresite.com/connexion">Se connecter</a>,
            <p>Si vous avez des questions, n'hésitez pas a nous contactez.</p>
            
            `
        )

        res.status(200).json({ Message: "Compte Infirmier(ère) validée avec succès"});
    }
    catch(error) {
        res.status(500).json({ Message: "Erreur lors de la validation du compte Infirmier(ère)", Error: error.message});
    }
};



module.exports = {validerPatient, validerMedecin, validerInfirmier};