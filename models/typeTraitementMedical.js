const mongoose = require("mongoose");

const typeTraitementMedicalSchema = new mongoose.Schema({
    nomTypeTraitement: { type: String, required: true },
    descriptionTypeTraitement: { type: String, required: true },
  },
  { timestamps: true}
);

module.exports = mongoose.model('TypeTraitementMedical', typeTraitementMedicalSchema);