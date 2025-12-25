import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import personnelRoutes from "./routes/personnelRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import matchRoutes from "./routes/matchRoutes.js"; 

import "./config/db.js"; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// test route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("SRM Backend Server is running 🚀");
});

// routes
app.use("/api/personnel", personnelRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/match", matchRoutes);

// SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
