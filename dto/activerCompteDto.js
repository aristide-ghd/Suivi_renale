const { object, string } = require('yup');

const activerCompteDto = object({
  body: object({
    motDePasse: string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Le mot de passe est requis')
  }),
});

module.exports = { activerCompteDto };