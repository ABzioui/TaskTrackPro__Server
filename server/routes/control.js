import express from "express";
import {
  getProjects,
  getTasks,
  updateTaskUser,
  deleteProject,
  deleteTask,
} from "../controllers/control.js";

const router = express.Router();
router.get("/projects", getProjects);
router.get("/tasks", getTasks);
router.put("/task/:id/assign/:userID", updateTaskUser);
router.delete("/deleteProject/:projectID", deleteProject);
router.delete("/deleteTask/:taskID", deleteTask);

export default router;
