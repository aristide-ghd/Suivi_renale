const { object, string } = require('yup');
const { default: mongoose } = require('mongoose');

const addPatientByProDto = object({
  body: object({
    nom: string().required('Le nom est requis'),
    prenom: string().required('Le prénom est requis'),
    email: string().email('L\'email est invalide').required('L\'email est requis'),
    telephone: string().required('Le numéro de téléphone est requis'),
    sexe: string().oneOf(['Masculin', 'Feminin']).required('Le sexe est requis'),
    statutValidation: string().oneOf(['En attente', 'Validé', 'Rejeté']).default('En attente'),
    ajouterPar: string().matches(mongoose.Types.ObjectId.isValid, 'L\'ID utilisateur est invalide').nullable()
  }),
});

module.exports = { addPatientByProDto };