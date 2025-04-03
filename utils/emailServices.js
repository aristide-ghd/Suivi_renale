const nodemailer = require("nodemailer");

// Configuration du service d'envoi d'email (Gmail)
const transporter = nodemailer.createTransport({
    service: "gmail", // Utilisation de Gmail
    auth: {
        user: process.env.EMAIL_USER, // Email de l'expediteur dans un fichier .env
        pass: process.env.EMAIL_PASS  // Mot de passe de l'expediteur dans un fichier .env
    }
});

/**
 * Envoie un email à un utilisateur
 * @param {string} destinataire - L'adresse email du destinataire
 * @param {string} sujet - L'objet du mail
 * @param {string} message - Le contenu du mail peut etre du HTML ou du texte Brut
 */

const sendEmail = async (destinataire, sujet, message) => {
    try {

        // Envoi du mail avec les informations fournies
        await transporter.sendMail({
            from: process.env.EMAIL_USER, // Expediteur
            to: destinataire,             // Destinataire
            subject: sujet,               // Objet du mail
            html: message                 // Contenu du mail au format HTML
        });
        console.log(`Email envoyé avec succès à ${destinataire}`);

    } 
    catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
    }
};

module.exports = {sendEmail};
