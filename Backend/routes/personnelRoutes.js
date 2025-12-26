import express from "express";
import { createPersonnel, getPersonnel, updatePersonnel, deletePersonnel } from "../controllers/personnelController.js";

const router = express.Router();

router.post("/", createPersonnel);
router.get("/", getPersonnel);
router.put("/:id",updatePersonnel);
router.delete("/:id", deletePersonnel);

export default router;