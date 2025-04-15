const express = require('express');
const router = express.Router();
const { activateAccount } = require('../controllers/patientControllers');
const { activerCompteDto } = require('../dto/activerCompteDto');
const { yupValidator } = require('../middlewares/yup');


// Route to set a password and activate the account
/**
 * @swagger
 * /api/patient/activateAccount:
 *   post:
 *     summary: Activate a patient account
 *     description: This route allows a patient to set a password and activate their account.
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Id of the patient
 *               token:
 *                  type: string
 *                  description: Token to validate the account
 *               password:
 *                 type: string
 *                 description: Password to activate the account
 *     responses:
 *       200:
 *         description: Mot de passe défini avec succès.En attente de validation
 *       400:
 *         description: Ce compte est déjà activé.
 *       401:
 *         description: Lien invalide ou expiré.
 *       404:
 *         description: Utilisateur introuvable.
 *       500:
 *         description: Erreur lors de la création du mot de passe.
 */
router.post('/activateAccount', yupValidator(activerCompteDto), activateAccount);

module.exports = router;