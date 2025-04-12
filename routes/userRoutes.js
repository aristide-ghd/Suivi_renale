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
 *               name:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *               email:
 *                 type: string
 *                 description: Email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *     responses:
 *       201:
 *         description: Utilisateur enregistré avec succès
 *       400:
 *         description: Erreur de validation
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
 *       401:
 *         description: Identifiants invalides
 */
router.post('/login', yupValidator(connexionDto), userConnected);

module.exports = router;