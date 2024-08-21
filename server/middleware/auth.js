import jwt from "jsonwebtoken";
// Middleware pour vérifier le token d'authentification
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization"); // Récupération du token depuis l'en-tête "Authorization"
    // Vérification de la présence du token
    if (!token) {
      return res.status(403).send("Access Denied"); // Retourne une erreur 403 si le token est absent
    }
    // Suppression du préfixe "Bearer " du token s'il est présent
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    // Vérification et décodage du token
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Vérifie et décode le token en utilisant la clé secrète JWT
    req.user = verified; // Stocke les informations utilisateur décodées dans l'objet de requête pour une utilisation ultérieure
    next(); // Passe à la prochaine fonction middleware
  } catch (err) {
    res.status(500).json({ error: err.message }); // Retourne une erreur 500 en cas de problème lors de la vérification du token
  }
};
