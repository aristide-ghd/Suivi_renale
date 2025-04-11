const jwt = require("jsonwebtoken");
const Utilisateur = require("../models/user/user");
const {sendEmail} = require("../utils/emailServices");


// Ajouter un patient par un médecin ou un infirmier
const addPatientByProfessionnel = async(req, res) => {

    try {
        const idUtilisateur = req.user.identity._id;
        const nomUserConnected = req.user.identity.nom;
        const prenomUserConnected = req.user.identity.prenom;
        
        // console.log("idUtilisateur:", idUtilisateur);
        
        // Vérifier si l'email ou le numéro de téléphone existe déjà
        const data = req.body;

        const existingEmail = await Utilisateur.findOne({ email: data.email });
        const existingPhone = await Utilisateur.findOne({ telephone: data.telephone });

        if( existingEmail ){
            return res.status(201).json({ Message: "Cet email existe déjà. Veuillez saisir un autre email." });
        }

        if( existingPhone ){
            return res.status(201).json({ Message: "Cet numéro de téléphone appartient déjà à un utilisateur. Veuillez renseigner un autre numéro." });
        }

        // Récupération des données du patient
        const data_receive = {
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            motDePasse: "",
            telephone: data.telephone,
            sexe: data.sexe,
            role: "Patient",
            ajoutePar: idUtilisateur
        };

        // Creation du nouvel utilisateur
        const nouvelPatient = new Utilisateur(data_receive);

        // Sauvegarde du nouvel utilisateur dans la base
        await nouvelPatient.save();

        // console.log( "NouvelPatient_id:", nouvelPatient._id);

        // Générer un token pour l'activation
        const token = jwt.sign( { id: nouvelPatient._id }, process.env.JWT_SECRET, { expiresIn: "1d" } );

        // Lien d'activation
        const lienActivation = `https://CKDTracker.com/activation?id=${nouvelPatient._id}&token=${token}`;

        console.log("Lien d'activation: ", lienActivation);

        const messageHTML = 
            `<p>Bonjour ${nouvelPatient.prenom} ${nouvelPatient.nom},</p>
             <p>Votre compte Patient a été créé par le professionnel de santé ${prenomUserConnected} ${nomUserConnected}. Veuillez cliquer sur le lien ci-dessous pour définir votre mot de passe afin que nous puissions valider le compte:</p>
             <a href="${lienActivation}">Definir mon mot de passe</a>`

        // Envoi de l’email
        await sendEmail(nouvelPatient.email, "Création de votre compte sur CKDTracker", messageHTML);
    
        res.status(201).json({ Message: "Patient ajouté avec succès. Un email a été envoyé pour l’activation du compte." });
    }
    catch(error) {
        res.status(500).json({ message: "Erreur lors de l'ajout du patient", Erreur: error.message });
    }

}


module.exports = { addPatientByProfessionnel };