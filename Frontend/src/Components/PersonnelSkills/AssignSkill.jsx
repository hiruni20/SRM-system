import { useEffect, useState } from "react";
import API from "../../Api/API";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  Box,
  FormControl,
  InputLabel,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AssignSkill = ({ open, onClose, refresh, editSkill }) => {
  const [personnel, setPersonnel] = useState([]);
  const [skills, setSkills] = useState([]);
  const [personnelId, setPersonnelId] = useState("");
  const [skillId, setSkillId] = useState("");
  const [proficiency, setProficiency] = useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  

  // Fetch personnel and skills
  useEffect(() => {
  if (!open) return;
  

  const fetchData = async () => {
    try {
      const personnelRes = await API.get("/personnel");
      const skillsRes = await API.get("/skills");

      const personnelList = Array.isArray(personnelRes.data) ? personnelRes.data : [];
      const skillsList = Array.isArray(skillsRes.data) ? skillsRes.data : [];

      setPersonnel(personnelList);
      setSkills(skillsList);

      // Prefill **after data is loaded**
      if (editSkill) {
        // Only set if the corresponding option exists
        const personnelExists = personnelList.find(p => p.id === editSkill.personnel_id);
        const skillExists = skillsList.find(s => s.id === editSkill.skill_id);

        setPersonnelId(personnelExists ? editSkill.personnel_id : "");
        setSkillId(skillExists ? editSkill.skill_id : "");
        setProficiency(editSkill.proficiency);
      } else {
        setPersonnelId("");
        setSkillId("");
        setProficiency("");
      }
    } catch (err) {
      console.error("Failed to fetch personnel or skills:", err);
    }
  };

  fetchData();
}, [open, editSkill]);



  const handleAssign = async () => {
    if (!personnelId || !skillId || !proficiency) {
      alert("Please select personnel, skill, and proficiency");
      return;
    }

     try {
    if (editSkill) {
      // UPDATE existing assignment
      await API.put(`/skills/assign/${editSkill.id}`, {
        personnelId: Number(personnelId),
        skillId: Number(skillId),
        proficiency
      });
      alert("Assigned skill updated successfully!");
    } else {
      // CREATE new assignment
      await API.post("/skills/assign", {
        personnelId: Number(personnelId),
        skillId: Number(skillId),
        proficiency
      });
      alert("Skill assigned successfully!");
    }

    // Clear form
    setPersonnelId("");
    setSkillId("");
    setProficiency("");

    // Close dialog and refresh parent
    onClose();
    if (refresh) refresh();

  } catch (err) {
    console.error(err);
    alert("Failed to assign/update skill. Check console for details.");
  }
};

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen} fullWidth maxWidth="sm">
      <DialogTitle>{editSkill ? "Edit Assigned Skill" : "Assign Skill to Personnel"}</DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Personnel</InputLabel>
            <Select
              value={personnelId}
              onChange={(e) => setPersonnelId(e.target.value)}
              label="Personnel"
              
            >
              <MenuItem value="">Select Personnel</MenuItem>
              {personnel.map((p) => (
                <MenuItem key={p.id} value={String(p.id)}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Skill</InputLabel>
            <Select
              value={skillId}
              onChange={(e) => setSkillId(e.target.value)}
              label="Skill"
            >
              <MenuItem value="">Select Skill</MenuItem>
              {skills.map((s) => (
                <MenuItem key={s.id} value={String(s.id)}>
                  {s.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Proficiency</InputLabel>
            <Select
              value={proficiency}
              onChange={(e) => setProficiency(e.target.value)}
              label="Proficiency"
            >
              <MenuItem value="">Select Proficiency</MenuItem>
              <MenuItem value="Beginner">Beginner (Level 1)</MenuItem>
              <MenuItem value="Intermediate">Intermediate (Level 2)</MenuItem>
              <MenuItem value="Advanced">Advanced (Level 3)</MenuItem>
              <MenuItem value="Expert">Expert (Level 4)</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAssign}>
          {editSkill ? "Update" : "Assign"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignSkill;
