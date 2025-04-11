const mongoose = require("mongoose");

const dossierMedicalSchema = new mongoose.Schema({
  notes: [{
    type: { type: String, enum: ['Historique', 'Recommandations', 'Observations', 'Suivi'] },
    content: { type: String },
    date: { type: Date, default: Date.now }
  }],
  idPatient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  consultations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Consultation" }],
  ordonnances: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ordonnance" }],
  traitements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Traitement" }]
}, 
{ timestamps: true }
);

module.exports = mongoose.model('DossierMedical', dossierMedicalSchema);
