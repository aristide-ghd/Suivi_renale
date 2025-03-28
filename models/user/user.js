const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    motDePasse: { type: String, required: true },
    telephone: { type: String, required: true },
    sexe: { type: String, enum: ["Homme", "Femme"], required: true },
    role: { type: String, enum: ["Patient", "Medecin", "Infirmier", "Administrateur"], required: true },
    dateCreation: { type: Date, default: Date.now },
    dateModification: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('User', userSchema);