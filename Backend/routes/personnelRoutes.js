import express from "express";
import { createPersonnel, getPersonnel } from "../controllers/personnelController.js";

const router = express.Router();

router.post("/", createPersonnel);
router.get("/", getPersonnel);

export default router;