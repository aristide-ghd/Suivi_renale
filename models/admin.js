const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    roleAdmin: { type: String, required: true },
    idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true }
  },
  { timestamps: true}
);

module.exports = mongoose.model('Administrateur', adminSchema);