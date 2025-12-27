import express from "express";
import {
  createSkill,
  getSkills,
  updateSkill,
  assignSkillToPersonnel,
  getAssignedSkills,
  deleteAssignedSkill,
  updateAssignedSkill
} from "../controllers/skillController.js";

const router = express.Router();

router.post("/", createSkill);
router.get("/", getSkills);
router.put("/:id", updateSkill);
router.post("/assign", assignSkillToPersonnel);
router.get("/assign", getAssignedSkills);
router.delete("/assign/:id", deleteAssignedSkill);
router.put("/assign/:id", updateAssignedSkill);

export default router;
