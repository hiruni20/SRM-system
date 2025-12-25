import db from "../config/db.js";

// Create Project
export const createProject = (req, res) => {
  const { name, description, start_date, end_date, status } = req.body;
  const sql =
    "INSERT INTO projects (name, description, start_date, end_date, status) VALUES (?,?,?,?,?)";
  db.query(
    sql,
    [name, description, start_date, end_date, status],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Project created successfully" });
    }
  );
};

// Get Projects
export const getProjects = (req, res) => {
  db.query("SELECT * FROM projects", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// Add Required Skill to Project
export const addRequiredSkill = (req, res) => {
  const { skillId, minProficiency } = req.body;
  const sql =
    "INSERT INTO project_required_skills (project_id, skill_id, min_proficiency) VALUES (?,?,?)";
  db.query(sql, [req.params.id, skillId, minProficiency], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Required skill added to project" });
  });
};
