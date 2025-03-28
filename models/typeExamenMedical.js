const mongoose = require("mongoose");

const typeExamenMedicalSchema = new mongoose.Schema({
    nomTypeExamen: { type: String, required: true },
    descriptionTypeExamen: { type: String, required: true },
  });

module.exports = mongoose.model('TypeExamenMedical', typeExamenMedicalSchema);