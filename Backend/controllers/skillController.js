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
/// Get all assigned skills
export const getAssignedSkills = (req, res) => {
  const sql = `
    SELECT 
      ps.id,
      ps.personnel_id,
      ps.skill_id,
      p.name AS personnel_name,
      s.name AS skill_name,
      ps.proficiency
    FROM personnel_skills ps
    JOIN personnel p ON ps.personnel_id = p.id
    JOIN skills s ON ps.skill_id = s.id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};



// Delete assigned skill
export const deleteAssignedSkill = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM personnel_skills WHERE id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Assigned skill deleted successfully" });
  });
};

// Update assigned skill 
export const updateAssignedSkill = (req, res) => {
  const { skillId, proficiency } = req.body;
  const { id } = req.params;
  const sql = "UPDATE personnel_skills SET skill_id=?, proficiency=? WHERE id=?";
  db.query(sql, [skillId, proficiency, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Assigned skill updated successfully" });
  });
};