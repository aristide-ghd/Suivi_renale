const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Suivi_renale',
            version: '1.0.0',
            description: 'Documentation de l\'API Suivi_renale',
        },
        servers: [
            {
            url: 'http://localhost:5000', // Remplacez par l'URL de votre API
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', // Format du token
                },
            },
        },
        // security: [
        //     {
        //     bearerAuth: [], // Applique l'authentification par défaut
        //     },
        // ],
    },
    apis: ['./routes/*.js'], // Chemin vers vos fichiers de routes
};

module.exports = swaggerJsDoc(swaggerOptions);