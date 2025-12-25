import express from "express";
import {
  createSkill,
  getSkills,
  updateSkill,
  assignSkillToPersonnel
} from "../controllers/skillController.js";

const router = express.Router();

router.post("/", createSkill);
router.get("/", getSkills);
router.put("/:id", updateSkill);
router.post("/assign", assignSkillToPersonnel);

export default router;
