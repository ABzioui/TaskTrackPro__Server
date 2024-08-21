import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* ENREGISTRER UN UTILISATEUR */
export const register = async (req, res) => {
  try {
    // Récupération des données de la requête
    const {
      firstName,
      lastName,
      email,
      password,
      picture,
      role,
      location,
      occupation,
      phoneNumber,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    // Génération d'un sel et hachage du mot de passe
    const salt = await bcrypt.genSalt(); // Génère un sel pour le hachage
    const passwordHash = await bcrypt.hash(password, salt); // Hache le mot de passe avec le sel généré

    // Création d'un nouvel utilisateur avec les données fournies
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash, // Utilise le mot de passe haché
      picturePath : picture,
      role,
      location,
      occupation,
      phoneNumber,
    });

    // Sauvegarde du nouvel utilisateur dans la base de données
    const savedUser = await newUser.save(); // Sauvegarde l'utilisateur dans la base de données MongoDB
    res.status(201).json(savedUser); // Retourne l'utilisateur créé avec le statut 201 (Créé avec succès)
  } catch (err) {
    res.status(500).json({ error: err.message }); // Retourne une erreur 500 en cas de problème lors de l'enregistrement de l'utilisateur
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    // Récupération des données de la requête
    const { email, password } = req.body;

    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ email: email });

    // Vérification de l'existence de l'utilisateur
    if (!user) return res.status(400).json({ msg: "User does not exist. " }); // Retourne une erreur 400 si l'utilisateur n'existe pas

    // Vérification de la correspondance des mots de passe hachés
    const isMatch = await bcrypt.compare(password, user.password); // Compare le mot de passe fourni avec le mot de passe haché de l'utilisateur
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " }); // Retourne une erreur 400 si les identifiants sont invalides

    // Création d'un token JWT pour l'authentification de l'utilisateur
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // Signe un token JWT avec l'ID de l'utilisateur et la clé secrète JWT

    // Suppression du mot de passe de l'utilisateur avant de le renvoyer
    delete user.password;

    // Retourne le token JWT et les informations de l'utilisateur
    res.status(200).json({ token, user }); // Retourne le token JWT et les informations de l'utilisateur avec le statut 200 (OK)
  } catch (err) {
    res.status(500).json({ error: err.message }); // Retourne une erreur 500 en cas de problème lors de la connexion de l'utilisateur
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user exists before attempting to delete
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Perform the deletion
    await User.deleteOne({ _id: id });

    // Send a success response
    res.status(200).json(user);
  } catch (err) {
    // Send an error response
    res.status(500).json({ error: err.message });
  }
};
