const { object, string } = require('yup');

const connexionDto = object({
    body: object({
        email: string().email('L\'email est invalide').required('L\'email est requis'),
        motDePasse: string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Le mot de passe est requis'),
    }),
});

module.exports = { connexionDto };