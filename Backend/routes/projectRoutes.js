import express from "express";
import {
  createProject,
  getProjects,
  addRequiredSkill
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", getProjects);
router.post("/:id/skills", addRequiredSkill);

export default router;
