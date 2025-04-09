const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    dateNaissance: { type: Date, required: true },
    adresse: { type: String, required: true },
    groupeSanguin: { type: String, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], required: true },
    allergiesConnues: { type: [String], default: [] },
    situationMatrimoniale: { type: String, enum: ["Célibataire", "Marié(e)", "Divorcé(e)", "Veuf(ve)"], required: true },
    contactUrgence: { type: String, required: true },
    electroPhorese: { type: String, enum: ["AA", "AC", "AS", "SC", "SS"], required: true },
    idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
    idMedecinPrincipal: { type: mongoose.Schema.Types.ObjectId, ref: "Medecin", default: null }
  },
  { timestamps: true}
);

  module.exports = mongoose.model('Patient', patientSchema);