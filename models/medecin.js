const mongoose = require ("mongoose");

const medecinSchema = new mongoose.Schema({
    specialite: { type: String, enum: ["Généraliste", "Neuphrologue"], required: true },
    numeroLicence: { type: String, required: true },
    signature: { type: Buffer, required: true},
    dateCreation: { type: Date, default: Date.now },
    dateModification: { type: Date, default: Date.now },
    idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true }
  });

module.exports = mongoose.model('Medecin', medecinSchema);