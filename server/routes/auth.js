import express from "express";
import { login, deleteUser } from "../controllers/auth.js";
import {uploadToAws} from "../s3Upload.js"

const router = express.Router();

router.post("/login", login);
router.delete("/deleteUser/:id", deleteUser);
router.post("/upload" , uploadToAws);

export default router;
