const mongoose = require("mongoose");

const medicamentSchema = new mongoose.Schema({
    nomCommercial: { type: String, required: true },
    nomScientifique: { type: String, required: true },
    dosage: { type: String, required: true },
    formePharmaceutique: { type: String, required: true},
    modeAdministration: { type: String, required: true }
  },
  { timestamps: true}
);

module.exports = mongoose.model('Medicament', medicamentSchema);