import express from "express";

import {
  getUser,
  getUserByEmail,
  getDashboardStats,
} from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/user/:email", getUserByEmail);
router.get("/dashboard", getDashboardStats);

export default router;
