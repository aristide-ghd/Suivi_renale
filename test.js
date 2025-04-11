const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Patient = require("../models/Patient");
const sendEmail = require("../utils/sendEmail");

const ajouterPatient = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, sexe } = req.body;

    // Vérifie que le user est connecté et est un médecin ou infirmier
    // const roleAjoutant = req.user.role;
    // if (roleAjoutant !== "Medecin" && roleAjoutant !== "Infirmier") {
    //   return res.status(403).json({ message: "Accès refusé." });
    // }

    // Vérifie si l'email existe déjà
    const utilisateurExistant = await User.findOne({ email });
    if (utilisateurExistant) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà." });
    }

    // Créer un utilisateur avec motDePasse vide
    const nouvelUtilisateur = new User({
      nom,
      prenom,
      email,
      telephone,
      sexe,
      role: "Patient",
      motDePasse: "", // temporaire
      statutValidation: "En attente"
    });

    await nouvelUtilisateur.save();

    // Créer le patient avec lien vers le médecin/infirmier qui l'ajoute
    const patient = new Patient({
      idUtilisateur: nouvelUtilisateur._id,
      idMedecinPrincipal: req.user._id // ou idAjoutePar
    });

    await patient.save();

    // Générer un token pour l'activation
    const token = jwt.sign(
      { id: nouvelUtilisateur._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Lien d'activation
    const lienActivation = `https://ton-site.com/activation?id=${nouvelUtilisateur._id}&token=${token}`;

    // Envoi de l’email
    await sendEmail(
      email,
      "Création de votre compte sur CKDTracker",
      `<p>Bonjour ${prenom},</p>
       <p>Votre compte a été créé par un professionnel de santé. Veuillez cliquer sur le lien ci-dessous pour définir votre mot de passe et activer votre compte :</p>
       <a href="${lienActivation}">Activer mon compte</a>`
    );

    return res.status(201).json({ message: "Patient ajouté avec succès. Un email a été envoyé pour l’activation du compte." });

  } catch (error) {
    console.error("Erreur lors de l'ajout du patient :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = ajouterPatient;



// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const activerCompte = async (req, res) => {
  const { id, token, motDePasse } = req.body;

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérifier que le token correspond bien au bon utilisateur
    if (decoded.id !== id) {
      return res.status(401).json({ message: "Lien invalide ou expiré." });
    }

    // Trouver l'utilisateur
    const utilisateur = await User.findById(id);
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    // Vérifier que le mot de passe n'est pas encore défini
    if (utilisateur.motDePasse && utilisateur.motDePasse !== "") {
      return res.status(400).json({ message: "Ce compte est déjà activé." });
    }

    // Hasher le mot de passe
    const hash = await bcrypt.hash(motDePasse, 10);

    // Mettre à jour l'utilisateur
    utilisateur.motDePasse = hash;
    await utilisateur.save();

    res.status(200).json({ message: "Mot de passe défini avec succès. Vous pouvez maintenant vous connecter." });

  } catch (err) {
    console.error("Erreur lors de l'activation :", err);
    res.status(500).json({ message: "Erreur lors de l'activation du compte." });
  }
};

module.exports = { activerCompte };



// routes/auth.js
const express = require('express');
const router = express.Router();
const { activerCompte } = require('../controllers/authController');

router.post('/activer-compte', activerCompte);

module.exports = router;



{
  "id": "ID_UTILISATEUR",
  "token": "TOKEN",
  "motDePasse": "leMotDePasseChoisi"
}
  



{
  "_id": "607c35bb4f1a2b3c87d890ab",
  "notes": [
    {
      "type": "Historique",
      "content": "Le patient a des antécédents de diabète de type 2. Diagnostic confirmé il y a 5 ans.",
      "date": "2025-04-10T00:00:00.000Z"
    },
    {
      "type": "Recommandations",
      "content": "Il est recommandé de réduire l'apport en sucre et d'augmenter l'activité physique.",
      "date": "2025-04-10T00:00:00.000Z"
    },
    {
      "type": "Observations",
      "content": "Le patient a montré une amélioration de son état suite au traitement actuel.",
      "date": "2025-04-10T00:00:00.000Z"
    },
    {
      "type": "Suivi",
      "content": "Suivi prévu dans 3 mois pour évaluer l'efficacité du traitement.",
      "date": "2025-04-10T00:00:00.000Z"
    }
  ],
  "idPatient": "607c35bb4f1a2b3c87d890ac",  // Référence à l'objet Patient
  "consultations": [
    "607c35bb4f1a2b3c87d890ad",  // Référence à un objet Consultation
    "607c35bb4f1a2b3c87d890ae"   // Référence à un autre objet Consultation
  ],
  "ordonnances": [
    "607c35bb4f1a2b3c87d890af"   // Référence à un objet Ordonnance
  ],
  "traitements": [
    "607c35bb4f1a2b3c87d890b0"   // Référence à un objet Traitement
  ],
  "createdAt": "2025-04-10T00:00:00.000Z",
  "updatedAt": "2025-04-10T00:00:00.000Z"
}
  