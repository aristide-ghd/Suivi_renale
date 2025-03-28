const jwt = require('jsonwebtoken');

const checkPermission = (permissions) => {
    return async (req, res, next) => {
      try {
        const userRole = req.user.identity.role;
        if (permissions.includes(userRole)) {
            next();
        } else {
              res.status(403).json({ error: 'Accès Refusé, vous n\'avez pas les authorisations nécéssaire' });
        }
      } catch (err) {
          res.status(400).json({ message: "Jeton invalide" });
      }
    };
};

module.exports = checkPermission;