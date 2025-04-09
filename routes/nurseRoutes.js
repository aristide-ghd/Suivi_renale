const express = require('express');
const router = express.Router();
const { addPatientByProfessionnel } = require('../controllers/professionnelControllers');
const { addPatientByProDto } = require('../dto/addPatientByProDto');
const { yupValidator } = require('../middlewares/yup');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkPermission } = require('../middlewares/roleMiddleware');

// Route pour ajouter un patient depuis son interface
router.post('/ajouterPatient', authMiddleware, checkPermission('Infirmier'), yupValidator(addPatientByProDto), addPatientByProfessionnel);

module.exports = router;