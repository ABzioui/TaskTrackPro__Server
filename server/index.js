import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import controlRoutes from "./routes/control.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import progressRoutes from "./routes/progress.js";

import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";
import { addProject, addTask } from "./controllers/control.js";

import { userData } from "./data/userData.js";
import { projectData } from "./data/projectData.js";
import { taskData } from "./data/taskData.js";
import { workHoursData } from "./data/workHoursData.js";
import { dataOverallStat } from "./data/dataOverallStat.js";

import User from "./models/User.js";
import Project from "./models/Project.js";
import Task from "./models/Task.js";
import WorkHour from "./models/WorkHour.js";
import Overall from "./models/OverAll.js";



/* Configuration */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); // Ainsi, nous pouvons définir nos variables d'environnement
const app = express();
app.use(express.json()); // Middleware pour parser le JSON
app.use(helmet()); // Middleware Helmet pour la sécurité
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Middleware Helmet pour la politique de ressource cross-origin
app.use(morgan("common")); // Middleware Morgan pour les logs
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Middleware Body Parser pour le JSON
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Middleware Body Parser pour les données URL encodées
app.use(cors()); // Middleware CORS pour les requêtes cross-origin
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // Middleware pour servir les fichiers statiques dans le dossier 'public/assets'

// Parse JSON bodies
/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });


/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.use("/auth", authRoutes); // Corrigez le chemin du middleware ici
app.post("/control/addProject", addProject);
app.post("/control/addTask", addTask);

/*ROUTES pour la SideBar et le contenu general*/
app.use("/control", controlRoutes);
app.use("/management", managementRoutes);
app.use("/general", generalRoutes); // "general" servira à obtenir les utilisateurs et le dashboard.
app.use("/progress", progressRoutes);
/* Mongoose */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    /* Ici, nous devons ajouter les méthodes pour ajouter des données */

    // User.insertMany(userData);
    // Project.insertMany(projectData);
    // Task.insertMany(taskData);
    // WorkHour.insertMany(workHoursData);
    // Overall.insertMany(dataOverallStat);
  })
  .catch((error) => console.log(`${error} did not connect`));
