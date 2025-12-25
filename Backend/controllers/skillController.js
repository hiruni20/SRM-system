import db from "../config/db.js";

// Create Skill
export const createSkill = (req, res) => {
  const { name, category, description } = req.body;
  const sql = "INSERT INTO skills (name, category, description) VALUES (?,?,?)";
  db.query(sql, [name, category, description], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Skill created successfully" });
  });
};

// Get All Skills
export const getSkills = (req, res) => {
  db.query("SELECT * FROM skills", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// Update Skill
export const updateSkill = (req, res) => {
  const { name, category, description } = req.body;
  const sql =
    "UPDATE skills SET name=?, category=?, description=? WHERE id=?";
  db.query(sql, [name, category, description, req.params.id], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Skill updated successfully" });
  });
};

// Assign Skill to Personnel
export const assignSkillToPersonnel = (req, res) => {
  const { personnelId, skillId, proficiency } = req.body;
  const sql =
    "INSERT INTO personnel_skills (personnel_id, skill_id, proficiency) VALUES (?,?,?)";
  db.query(sql, [personnelId, skillId, proficiency], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Skill assigned to personnel" });
  });
};
