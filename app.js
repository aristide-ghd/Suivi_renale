const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const authorization = require('./routes/authorization');
const administrator = require('./routes/administrator');

require("dotenv").config(); // Charge les variables d'environnement depuis .env

//Connect to database
connectDB();

//Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authorization);
app.use('/api/admin', administrator);


// Port d'ecoute
const PORT = process.env.PORT || 5000;
app.listen(PORT /*, () => console.log(`Server running on port ${PORT}`)*/);