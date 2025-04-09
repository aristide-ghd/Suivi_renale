const express = require('express');
const router = express.Router();
const {validerPatient, validerMedecin, validerInfirmier} = require('../controllers/validerCompteControllers');
const {getUtilisateursEnAttente, getUtilisateurById} = require('../controllers/userControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkPermission } = require('../middlewares/roleMiddleware');


// Route pour obtenir la liste des utilisateurs en attente
router.get('/utilisateurs/en_attente', authMiddleware, checkPermission('Administrateur'), getUtilisateursEnAttente);

// Route pour obtenir tous les infos d'un utilisateur
router.get('/utilisateurs/:id', authMiddleware, checkPermission('Administrateur'), getUtilisateurById);

// Route pour valider un patient par l'administrateur
router.put('/validerPatient/:id', authMiddleware, checkPermission('Administrateur'), validerPatient);

// Route pour valider un médécin par l'administrateur
router.put('/validerMedecin/:id', authMiddleware, checkPermission('Administrateur'), validerMedecin);

// Route pour valider un infirmier par l'administrateur
router.put('/validerInfirmier/:id', authMiddleware, checkPermission('Administrateur'), validerInfirmier);


module.exports = router;