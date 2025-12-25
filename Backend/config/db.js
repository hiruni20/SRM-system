import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "205084Chr#",
  database: "skill_management"
});

db.connect(err => {
  if (err) console.error(err);
  console.log("MySQL Connected");
});

export default db;
