const express = require('express');
const router = express.Router();
const { register, userConnected } = require('../controllers/userControllers');
const { validateUserByRole } = require('../middlewares/validateUserByRole');
const { connexionDto } = require('../dto/connexionDto');
const { yupValidator } = require('../middlewares/yup');

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Enregistre un nouvel utilisateur
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *               prenom:
 *                 type: string
 *                 description: Prénom de l'utilisateur
 *               email:
 *                 type: string
 *                 description: Email de l'utilisateur
 *               motDePasse:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *               telephone:
 *                 type: string
 *                 description: Numéro de téléphone de l'utilisateur
 *               sexe:
 *                 type: string
 *                 enum: [Homme, Femme]
 *                 description: Sexe de l'utilisateur
 *               role:
 *                 type: string
 *                 enum: [Patient, Medecin, Infirmier]
 *                 description: Rôle de l'utilisateur
 *               dateNaissance:
 *                 type: string
 *                 format: date
 *                 description: Date de naissance (nécessaire pour les patients)
 *               adresse:
 *                 type: string
 *                 description: Adresse de l'utilisateur (nécessaire pour les patients)
 *               groupeSanguin:
 *                 type: string
 *                 description: Groupe sanguin (nécessaire pour les patients)
 *               allergiesConnues:
 *                 type: string
 *                 description: Allergies connues (nécessaire pour les patients)
 *               situationMatrimoniale:
 *                 type: string
 *                 description: Situation matrimoniale (nécessaire pour les patients)
 *               contactUrgence:
 *                 type: string
 *                 description: Contact d'urgence (nécessaire pour les patients)
 *               electroPhorese:
 *                 type: string
 *                 description: Électrophorèse (nécessaire pour les patients)
 *               specialite:
 *                 type: string
 *                 description: Spécialité (nécessaire pour les médecins)
 *               numeroLicence:
 *                 type: string
 *                 description: Numéro de licence (nécessaire pour les médecins)
 *               signature:
 *                 type: string
 *                 description: Signature (nécessaire pour les médecins)
 *               serviceAffectation:
 *                 type: string
 *                 description: Service d'affectation (nécessaire pour les infirmiers)
 *     responses:
 *       201:
 *         description: Utilisateur enregistré avec succès
 *       400:
 *         description: Email déjà utilisé
 *       401:
 *         description: Numéro de téléphone déjà utilisé
 *       402:
 *         description: Mot de passe requis
 *       500:
 *         description: Erreur lors de l'enregistrement
 */
router.post('/register', validateUserByRole, register);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Connecte un utilisateur
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       400:
 *         description: l'email est invalide
 *       401:
 *         description: Mot de passe incorrect
 *       404:
 *         description: Votre compte n'est pas validé
 *       500:
 *         description: Erreur lors de la connexion
 */
router.post('/login', yupValidator(connexionDto), userConnected);

module.exports = router;