const mongoose = require("mongoose");

const ordonnanceSchema = new mongoose.Schema({
    dateEmission: { type: Date, required: true },
    idConsultation: { type: mongoose.Schema.Types.ObjectId, ref: "Consultation", required: true }
  });

module.exports = mongoose.model('Ordonnance', ordonnanceSchema);