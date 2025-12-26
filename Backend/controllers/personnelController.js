import db from "../config/db.js";

/**
 * CREATE personnel
 */
export const createPersonnel = (req, res) => {
  const { name, email, role, experience } = req.body;

  const sql =
    "INSERT INTO personnel (name, email, role, experience) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, role, experience], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Personnel created successfully" });
  });
};

/**
 * GET all personnel
 */
export const getPersonnel = (req, res) => {
  db.query("SELECT * FROM personnel", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

/**
 * UPDATE personnel ✅
 */
export const updatePersonnel = (req, res) => {
  const { name, email, role, experience } = req.body;
  const { id } = req.params;

  const sql =
    "UPDATE personnel SET name=?, email=?, role=?, experience=? WHERE id=?";

  db.query(sql, [name, email, role, experience, id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Personnel not found" });
    }

    res.json({ message: "Personnel updated successfully" });
  });
};

/**
 * DELETE personnel ✅
 */
export const deletePersonnel = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM personnel WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Personnel not found" });
    }

    res.json({ message: "Personnel deleted successfully" });
  });
};
