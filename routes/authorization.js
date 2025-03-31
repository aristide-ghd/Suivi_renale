const express = require('express');
const router = express.Router();
const {enregistrerUtilisateur} = require('../controllers/userControllers');

// Route pour enregistrer un utilisateur
router.post('/enregistrer', enregistrerUtilisateur);

module.exports = router;