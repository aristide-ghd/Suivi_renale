const express = require('express');
const router = express.Router();
const { addPatientByProfessional } = require('../controllers/professionnelControllers');
const { addPatientByProDto } = require('../dto/addPatientByProDto');
const { yupValidator } = require('../middlewares/yup');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkPermission } = require('../middlewares/roleMiddleware');


// Route to add a patient from the nurse's interface
/**
 * @swagger
 * /api/nurse/addPatient:
 *   post:
 *     summary: Add a patient from the nurse's interface
 *     description: This route allows a nurse to add a patient to the system.
 *     tags: [Nurses]
 *     security:
 *       - bearerAuth: [] # Requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the patient
 *               asurname:
 *                 type: string
 *                 description: Surname of the patient
 *               email:
 *                 type: string
 *                 description: Email of the patient
 *               phone:
 *                 type: string
 *                 description: Phone number of the patient
 *               sexe:
 *                 type: string
 *                 description: Sexe of the patient(Masculin or Feminin)
 *     responses:
 *       201:
 *         description: Cet email existe déjà. Veuillez saisir un autre email.
 *       202:
 *         description: Cet numéro de téléphone appartient déjà à un utilisateur. Veuillez renseigner un autre numéro.
 *       200:
 *         description: Patient ajouté avec succès
 *       500:
 *         description: Erreur lors de l'ajout du patient
 */
router.post('/addPatient', authMiddleware, checkPermission('Infirmier'), yupValidator(addPatientByProDto), addPatientByProfessional);

module.exports = router;