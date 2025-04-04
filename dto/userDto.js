const { object, string } = require('yup');

const userDto = object({
  body: object({
    nom: string().required('Le nom est requis'),
    prenom: string().required('Le prénom est requis'),
    email: string().email('L\'email est invalide').required('L\'email est requis'),
    motDePasse: string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Le mot de passe est requis'),
    telephone: string().required('Le numéro de téléphone est requis'),
    sexe: string().oneOf(['Masculin', 'Feminin']).required('Le sexe est requis'),
    role: string().oneOf(['Patient', 'Medecin', 'Infirmier','Administrateur']).required('Le rôle est requis'),
  }),
});

module.exports = { userDto };