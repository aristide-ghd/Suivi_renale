const express = require('express');
const router = express.Router();
const {enregistrerUtilisateur} = require('../controllers/userControllers');
const { validateUserByRole } = require('../middlewares/validateUserByRole');

// Route pour enregistrer un utilisateur
router.post('/enregistrer', validateUserByRole, enregistrerUtilisateur);

module.exports = router;