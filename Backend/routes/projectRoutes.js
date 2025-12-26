import express from "express";
import {
  createProject,
  getProjects,
  addRequiredSkill,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", getProjects);
router.post("/:id/skills", addRequiredSkill);
router.put("/:id",updateProject);
router.delete("/:id",deleteProject)

export default router;
