const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    posologie: { type: String, required: true },
    dureeTraitement: { type: String, required: true },
    quantite: { type: Number, required: true },
    idOrdonnance: { type: mongoose.Schema.Types.ObjectId, ref: "Ordonnance", required: true },
    idMedicament: { type: mongoose.Schema.Types.ObjectId, ref: "Medicament", required: true }
  },
  { timestamps: true}
);

module.exports = mongoose.model('Prescription', prescriptionSchema);