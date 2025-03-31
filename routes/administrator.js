const express = require('express');
const router = express.Router();
const {validerPatient, validerMedecin, validerInfirmier} = require('../controllers/validerCompteControllers');
const {getUtilisateursEnAttente, getUtilisateurById} = require('../controllers/userControllers');


// Route pour valider un patient par l'administrateur
router.get('/validerPatient/:id', validerPatient);

// Route pour valider un médécin par l'administrateur
router.get('/validerMedecin/:id', validerMedecin);

// Route pour valider un infirmier par l'administrateur
router.get('/validerInfirmier/:id', validerInfirmier);

// Route pour obtenir la liste des utilisateurs en attente
router.get('/utilisateurs/en_attente', getUtilisateursEnAttente);

// Route pour obtenir tous les infos d'un utilisateur
router.get('/utilisateurs/:id', getUtilisateurById);


module.exports = router;