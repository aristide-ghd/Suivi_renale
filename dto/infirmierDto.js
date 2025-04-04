const { object, string } = require('yup');

const infirmierDto = object({
  body: object({
    serviceAffectation: string().required('Le service d\'affectation requis'),
    idUtilisateur: string(),
  }),
});

module.exports = { infirmierDto };