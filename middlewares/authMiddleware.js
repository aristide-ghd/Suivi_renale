const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    let token = req.header('Authorization');
    
    if (!token) {
        return res.status(400).json({ message: "Accès refusé. Aucun jeton n'a été fourni" });
    }

    // Vérifier si le token est bien au format "Bearer [token]"
    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    } else {
        return res.status(400).json({ message: "Format du jeton invalide" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: "Jeton invalide" });
    }
};

module.exports = { authMiddleware };