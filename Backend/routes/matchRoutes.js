import express from "express";
import { matchPersonnel } from "../controllers/matchController.js";

const router = express.Router();

router.get("/:projectId", matchPersonnel);

export default router;
