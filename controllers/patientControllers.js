const jwt = require("jsonwebtoken");
const Utilisateur = require("../models/user/user");
const bcrypt = require("bcryptjs");


// Fonction pour definir son mot de passe en cliquant sur le lien 
const activerCompte = async (req, res) => {

  const { id, token, motDePasse } = req.body;

  try {
    // Vérifie le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérifie que le token correspond bien au bon utilisateur
    if (decoded.id !== id) {
      return res.status(401).json({ Message: "Lien invalide ou expiré." });
    }

    // Trouve l'utilisateur
    const utilisateur = await Utilisateur.findById(id);

    if (!utilisateur) {
      return res.status(404).json({ Message: "Utilisateur introuvable." });
    }

    // Vérifie que le champ mot de passe existe et qu'il n'est pas encore défini
    if (utilisateur.motDePasse && utilisateur.motDePasse !== "") {
      return res.status(400).json({ Message: "Ce compte est déjà activé." });
    }

    // Hasher le mot de passe
    const hash = await bcrypt.hash(motDePasse, 10);

    // Mettre à jour le mot de passe de l'utilisateur
    utilisateur.motDePasse = hash;

    // Sauvegarde du champ motDePasse dans la table Utilisateur
    await utilisateur.save();


    res.status(200).json({ Message: "Mot de passe défini avec succès. Veuillez patientez pendant que nous validons votre compte." });

  } catch (err) {
    console.error("Erreur lors de la creation du mot de passe :", err);
    res.status(500).json({ Message: "Erreur lors de la creation du mot de passe.", Erreur: err.message });
  }

};


module.exports = { activerCompte };