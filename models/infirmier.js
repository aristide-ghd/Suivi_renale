const mongoose = require("mongoose");

const infirmierSchema = new mongoose.Schema({
    serviceAffectation: { type: String, required: true },
    idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true }
  },
  { timestamps: true}
);

module.exports = mongoose.model('Infirmier', infirmierSchema);