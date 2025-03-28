const mongoose = require("mongoose");

const dossierMedicalSchema = new mongoose.Schema({
    notes: { type: String, required: true },
    idPatient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true }
  },
  { timestamps: true}
);

module.exports = mongoose.model('DossierMedical', dossierMedicalSchema);