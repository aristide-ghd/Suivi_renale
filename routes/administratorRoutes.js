const express = require('express');
const router = express.Router();
const { validatePatient, validateDoctor, validateNurse } = require('../controllers/validerCompteControllers');
const { getPendingUsers, getUserById } = require('../controllers/userControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkPermission } = require('../middlewares/roleMiddleware');



// Route to get the list of pending users
/**
 * @swagger
 * /api/admin/pending:
 *   get:
 *     summary: Retrieve the list of users pending validation
 *     description: This route allows an administrator to get the list of users waiting for validation.
 *     tags: [Administrateurs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs en attente récupérée avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Aucun utilisateur en attente trouvé
 */
router.get('/pending', authMiddleware, checkPermission('Administrateur'), getPendingUsers);



// Route to get all information of a user by ID
/**
 * @swagger
 * /api/admin/{id}:
 *   get:
 *     summary: Retrieve user information by their ID
 *     description: This route allows an administrator to retrieve the information of a user by their ID.
 *     tags: [Administrateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur lors de la récupération des informations de l'utilisateur
 */
router.get('/:id', authMiddleware, checkPermission('Administrateur'), getUserById);



// Route to validate a patient by the administrator
/**
 * @swagger
 * /api/admin/validatePatient/{id}:
 *   put:
 *     summary: Validate a patient by the administrator
 *     description: This route allows an administrator to validate a patient.
 *     tags: [Administrateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du patient à valider
 *     responses:
 *       200:
 *         description: Patient validé avec succès
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Patient non trouvé
 *       500:
 *         description: Erreur lors de la validation du patient
 */
router.put('/validatePatient/:id', authMiddleware, checkPermission('Administrateur'), validatePatient);



// Route to validate a doctor by the administrator
/**
 * @swagger
 * /api/admin/validateDoctor/{id}:
 *   put:
 *     summary: Validate a doctor by the administrator
 *     description: This route allows an administrator to validate a doctor.
 *     tags: [Administrateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du médecin à valider
 *     responses:
 *       200:
 *         description: Médecin validé avec succès
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Médecin non trouvé
 *       500:
 *         description: Erreur lors de la validation du médecin
 */
router.put('/validateDoctor/:id', authMiddleware, checkPermission('Administrateur'), validateDoctor);



// Route to validate a nurse by the administrator
/**
 * @swagger
 * /api/admin/validerInfirmier/{id}:
 *   put:
 *     summary: Validate a nurse by the administrator
 *     description: This route allows an administrator to validate a nurse.
 *     tags: [Administrateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'infirmier à valider
 *     responses:
 *       200:
 *         description: Infirmier validé avec succès
 *       400:
 *         description: ID invalide
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Infirmier non trouvé
 *       500:
 *         description: Erreur lors de la validation de l'infirmier
 */
router.put('/validateNurse/:id', authMiddleware, checkPermission('Administrateur'), validateNurse);



module.exports = router;