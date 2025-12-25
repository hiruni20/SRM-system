import db from "../config/db.js";

export const matchPersonnel = (req, res) => {
  const projectId = req.params.projectId;

  const sql = `
    SELECT 
      p.id,
      p.name,
      p.role,
      COUNT(prs.skill_id) AS matchedSkills
    FROM personnel p
    JOIN personnel_skills ps ON p.id = ps.personnel_id
    JOIN project_required_skills prs
      ON ps.skill_id = prs.skill_id
      AND ps.proficiency >= prs.min_proficiency
    WHERE prs.project_id = ?
    GROUP BY p.id
    HAVING matchedSkills = (
      SELECT COUNT(*) FROM project_required_skills WHERE project_id = ?
    )
  `;

  db.query(sql, [projectId, projectId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
