const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    motDePasse: { type: String, required: false },
    telephone: { type: String, required: true },
    sexe: { type: String, enum: ["Masculin", "Feminin"], required: true },
    role: { type: String, enum: ["Patient", "Medecin", "Infirmier", "Administrateur"], required: true },
    statutValidation: { type: String, enum: ["En attente", "Validé", "Rejeté"], default: "En attente"},
    ajoutePar: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", default: null }
  }, 
  { timestamps: true}
);

  module.exports = mongoose.model('User', userSchema);