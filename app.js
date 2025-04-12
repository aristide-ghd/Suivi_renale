// Description: Fichier principal de l'application Express.js
// Importer les modules nécessaires
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path'); // Importer le module path
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./docs/swagger');


// Importer les routes
const userRoutes = require('./routes/userRoutes');
const administratorRoutes = require('./routes/administratorRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const nurseRoutes = require('./routes/nurseRoutes');
const patientRoutes = require('./routes/patientRoutes');


// Charger les variables d'environnement
require("dotenv").config();

//Connect to database
connectDB();

//Middleware
app.use(express.json());
app.use(cors());

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));


// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
     explorer: true,
     customSiteTitle: "API Suivi_renale - Documentation",
    }
));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', administratorRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/nurse', nurseRoutes);
app.use('/api/patient', patientRoutes);


// Port d'ecoute
const PORT = process.env.PORT || 5000;
app.listen(PORT /*, () => console.log(`Server running on port ${PORT}`)*/);