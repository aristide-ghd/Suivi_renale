const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    dateHeure: { type: Date, required: true },
    typeNotification: { type: String, enum: ["Traitement", "Rendez-vous", "Alerte", "Information"], required: true },
    contenu: { type: String, required: true },
    statut:{ type: String, enum: ["Non lu", "Lu"], required: true},
    idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true }
  },
  { timestamps: true}
);

module.exports = mongoose.model('Notification', notificationSchema);