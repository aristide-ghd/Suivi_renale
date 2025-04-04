// Middleware de validation dynamique selon le role du corps de la requete

const { userDto } = require('../dto/userDto');
const { patientDto } = require('../dto/patientDto');
const { medecinDto } = require('../dto/medecinDto');
const { infirmierDto } = require('../dto/infirmierDto');

const validateUserByRole = async (req, res, next) => {

  try {

        await userDto.validate({ body: req.body }, { abortEarly: false });

        const role = req.body.role;

        if (role === 'Patient') {

            await patientDto.validate({ body: req.body }, { abortEarly: false });

        } 
        else if (role === 'Medecin') {

            await medecinDto.validate({ body: req.body }, { abortEarly: false });

        } 
        else if (role === 'Infirmier') {

            await infirmierDto.validate({ body: req.body }, { abortEarly: false });

        }

        next();

    } 
  catch (error) {
    return res.status(400).json({ Message: 'Erreur de validation', Erreurs: error.errors });
  }
  
};

module.exports = { validateUserByRole };
