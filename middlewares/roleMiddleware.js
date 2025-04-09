
const checkPermission = (permissions) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user.identity.role;

      if (permissions.includes(userRole)) {
        return next(); // important quand l'on ajoutes du code après
      }

      return res.status(403).json({ error: "Accès refusé, vous n'avez pas les autorisations nécessaires." });
      
    } catch (err) {
      console.error("Erreur dans checkPermission:", err); // utile en dev
      return res.status(400).json({ message: "Jeton invalide" });
    }
  }

};

module.exports = {checkPermission};