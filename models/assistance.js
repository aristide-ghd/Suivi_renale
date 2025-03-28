const mongoose = require("mongoose");

const assistanceSchema = new mongoose.Schema({
    dateObservation: { type: Date, required: true },
    observation: { type: String, required: true },
    idInfirmier: { type: mongoose.Schema.Types.ObjectId, ref: "Infirmier", required: true },
    idTraitementMedical: { type: mongoose.Schema.Types.ObjectId, ref: "TraitementMedical", required: true }
  },
  { timestamps: true}
);

module.exports = mongoose.model('Assistance', assistanceSchema);