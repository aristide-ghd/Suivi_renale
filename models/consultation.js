const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
    dateConsultation: { type: Date, required: true },
    observation: { type: String, required: true},
    temperature: { type: Number, required: false},
    tensionArterielle: { type: String, required: false},
    frequenceCardiaque: { type: Number, required: false},
    poids: { type: Number, required: false},
    diagnostic: { type: String, required: true},
    dateCreation: { type: Date, default: Date.now },
    dateModification: { type: Date, default: Date.now },
    idDossier: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical", required: true },
    idRendezVous: { type: mongoose.Schema.Types.ObjectId, ref: "RendezVous", default: null }
  });

  module.exports = mongoose.model('Consultation', consultationSchema);