import db from "../config/db.js";

export const createPersonnel = (req, res) => {
  const { name, email, role, experience } = req.body;
  const sql = "INSERT INTO personnel (name,email,role,experience) VALUES (?,?,?,?)";
  db.query(sql, [name, email, role, experience], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Personnel created" });
  });
};

export const getPersonnel = (req, res) => {
  db.query("SELECT * FROM personnel", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
