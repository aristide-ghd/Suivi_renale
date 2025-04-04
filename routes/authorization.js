const express = require('express');
const router = express.Router();
const {enregistrerUtilisateur, userConnected} = require('../controllers/userControllers');
const { validateUserByRole } = require('../middlewares/validateUserByRole');
const { connexionDto } = require('../dto/connexionDto');
const { yupValidator } = require('../middlewares/yup');

// Route pour enregistrer un utilisateur
router.post('/enregistrer', validateUserByRole, enregistrerUtilisateur);

// Route pour connecter un utilisateur
router.post('/connecter', yupValidator(connexionDto), userConnected);

module.exports = router;