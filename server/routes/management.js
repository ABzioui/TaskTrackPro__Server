import express from "express"; // Importation du framework Express pour construire des applications web
import {
  getUsers,
  getGeography,
  getUserWorkHours,
} from "../controllers/management.js";

const router = express.Router(); // Création d'une nouvelle instance de routeur en utilisant Express Router

router.get("/admin", getUsers);
router.get("/geography", getGeography);
router.get("/performance", getUserWorkHours);

export default router; // Exportation de l'instance du routeur comme exportation par défaut de ce module
