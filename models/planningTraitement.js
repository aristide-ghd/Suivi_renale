const mongoose = require("mongoose");

const planningTraitementSchema = new mongoose.Schema({
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    periode: { type: String, required: true },
    statut: { type: String, enum: ["Prévu", "En cours", "Suspendu", "Terminé", "Annulé", "Non respecté", "Modifié"], required: true },
    dateCreation: { type: Date, default: Date.now },
    dateModification: { type: Date, default: Date.now },
    idDossier: { type: mongoose.Schema.Types.ObjectId, ref: "DossierMedical", required: true },
  });

module.exports = mongoose.model('PlanningTraitement', planningTraitementSchema);