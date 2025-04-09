const { object, string } = require('yup');
const { default: mongoose } = require('mongoose');

const infirmierDto = object({
  body: object({
    serviceAffectation: string().required('Le service d\'affectation requis'),
    idUtilisateur: string().required('L\'ID utilisateur est requis').matches(mongoose.Types.ObjectId.isValid, 'L\'ID utilisateur est invalide'), // Validation de l'ID utilisateur MongoDB
  }),
});

module.exports = { infirmierDto };