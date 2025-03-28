const mongoose = require("mongoose");

const traitementMedicalSchema = new mongoose.Schema({
    nomTraitement: { type: String, required: true },
    descriptionTraitement: { type: String, required: true },
    idTypeTraitement: { type: mongoose.Schema.Types.ObjectId, ref: "TypeTraitementMedical", required: true },
    idPlanningTraitement: { type: mongoose.Schema.Types.ObjectId, ref: "PlanningTraitement", required: true }
  },
  { timestamps: true}
);

module.exports = mongoose.model('TraitementMedical', traitementMedicalSchema);