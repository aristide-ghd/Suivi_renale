const express = require('express');
const router = express.Router();
const { activerCompte } = require('../controllers/patientControllers');
const { activerCompteDto } = require('../dto/activerCompteDto');
const { yupValidator } = require('../middlewares/yup');

// Route pour definir son mot de passe et activer son compte
router.post('/activerCompte', yupValidator(activerCompteDto), activerCompte);

module.exports = router;