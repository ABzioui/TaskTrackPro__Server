import express from "express";
import { getOverview } from "../controllers/progress.js";

const router = express.Router();

router.get("/overview", getOverview);

export default router;
