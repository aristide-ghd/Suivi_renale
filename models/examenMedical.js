const mongoose = require("mongoose");

const examenMedicalSchema = new mongoose.Schema({
    dateExamen: { type: Date, required: true },
    designation: { type: String, required: true },
    resultats: { type: String, required: false },
    idConsultation: { type: mongoose.Schema.Types.ObjectId, ref: "Consultation", required: true },
    idTypeExamenMedical: { type: mongoose.Schema.Types.ObjectId, ref: "TypeExamenMedical", required: true }
  },
  { timestamps: true}
);

module.exports = mongoose.model('ExamenMedical', examenMedicalSchema);