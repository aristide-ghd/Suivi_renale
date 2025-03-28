const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    roleAdmin: { type: String, required: true },
    dateCreation: { type: Date, default: Date.now },
    dateModification: { type: Date, default: Date.now },
    idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true }
  });

module.exports = mongoose.model('Administrateur', adminSchema);