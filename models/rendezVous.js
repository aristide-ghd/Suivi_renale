const mongoose = require("mongoose");

const rendezVousSchema = new mongoose.Schema({
    dateHeure: { type: Date, required: true },
    motif: { type: String, required: true},
    statut: { type: String, enum: ["En attente", "Confirmé", "Annulé", "Terminé"], required: true },
    idPatient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    idMedecin: { type: mongoose.Schema.Types.ObjectId, ref: "Medecin", required: true }
  },
  { timestamps: true}
);

module.exports = mongoose.model('RendezVous', rendezVousSchema);