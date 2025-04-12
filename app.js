const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const administratorRoutes = require('./routes/administratorRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const nurseRoutes = require('./routes/nurseRoutes');
const patientRoutes = require('./routes/patientRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./docs/swagger');

require("dotenv").config(); // Charge les variables d'environnement depuis .env

//Connect to database
connectDB();

//Middleware
app.use(express.json());
app.use(cors());

// Message de Bienvenue au demarrage du fichier
app.get('/', (req, res) => {
    res.send("Bienvenue sur mon appli");
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
     explorer: true,
     customSiteTitle: "API Suivi_renale - Documentation",
    }));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', administratorRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/nurse', nurseRoutes);
app.use('/api/patient', patientRoutes);


// Port d'ecoute
const PORT = process.env.PORT || 5000;
app.listen(PORT /*, () => console.log(`Server running on port ${PORT}`)*/);