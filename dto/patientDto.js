const { object, string, date, array } = require('yup');

const patientDto = object({
  body: object({
    dateNaissance: date().required('La date de naissance est requise'),
    adresse: string().required('L\'adresse est requise'),
    groupeSanguin: string().oneOf(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).required('Le groupe sanguin est requis'),
    allergiesConnues: array().of(string()).nullable(),
    situationMatrimoniale: string().oneOf(["Célibataire", "Marié(e)", "Divorcé(e)", "Veuf(ve)"]).required('La situation matrimoniale est requise'),
    contactUrgence: string().required('Le contact d\'urgence requis'),
    electroPhorese: string().oneOf(["AA", "AC", "AS", "SC", "SS"]).required('L\'electrophorèse est requise'),
    idUtilisateur: string(),
  }),
});

module.exports = { patientDto };