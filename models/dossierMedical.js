const mongoose = require("mongoose");

const dossierMedicalSchema = new mongoose.Schema({
    notes: { type: String, required: true },
    dateCreation: { type: Date, default: Date.now },
    dateModification: { type: Date, default: Date.now },
    idPatient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true }
  });

module.exports = mongoose.model('DossierMedical', dossierMedicalSchema);