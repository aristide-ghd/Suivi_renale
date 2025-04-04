const { default: mongoose } = require('mongoose');
const { object, string, mixed } = require('yup');

const medecinDto = object({
  body: object({
    specialite: string().oneOf(["Généraliste", "Nephrologue"]).required('La spécialité est requise'),
    numeroLicence: string().required('Le numéro de licence est requis'),
    signature: mixed().required('La signature est requise').test('is-buffer', 'La signature doit être un fichier', (value) => value instanceof Buffer),
    idUtilisateur: string().required('L\'ID utilisateur est requis').matches(mongoose.Types.ObjectId.isValid, 'L\'ID utilisateur est invalide'), // Validation de l'ID utilisateur MongoDB
  }),
});


module.exports = { medecinDto };