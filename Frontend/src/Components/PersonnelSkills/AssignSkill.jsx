import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  Paper
} from "@mui/material";

export default function AssignSkill() {
  const [personnel, setPersonnel] = useState([]);
  const [skills, setSkills] = useState([]);
  const [personnelId, setPersonnelId] = useState("");
  const [skillId, setSkillId] = useState("");

  useEffect(() => {
    axios.get("/api/personnel").then(res => setPersonnel(res.data));
    axios.get("/api/skills").then(res => setSkills(res.data));
  }, []);

  const handleAssign = async () => {
    if (!personnelId || !skillId) return;

    await axios.post("/api/personnel-skills", {
      personnelId,
      skillId
    });

    alert("Skill assigned successfully");
    setSkillId("");
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">Assign Skill to Personnel</Typography>

      <Select
        fullWidth
        value={personnelId}
        onChange={e => setPersonnelId(e.target.value)}
        displayEmpty
        sx={{ mt: 2 }}
      >
        <MenuItem value="">Select Personnel</MenuItem>
        {personnel.map(p => (
          <MenuItem key={p.id} value={p.id}>
            {p.name}
          </MenuItem>
        ))}
      </Select>

      <Select
        fullWidth
        value={skillId}
        onChange={e => setSkillId(e.target.value)}
        displayEmpty
        sx={{ mt: 2 }}
      >
        <MenuItem value="">Select Skill</MenuItem>
        {skills.map(s => (
          <MenuItem key={s.id} value={s.id}>
            {s.name}
          </MenuItem>
        ))}
      </Select>

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleAssign}
      >
        Assign Skill
      </Button>
    </Paper>
  );
}
