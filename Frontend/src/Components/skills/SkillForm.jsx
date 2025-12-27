import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import API from "../../Api/API.js";

const SkillForm = ({ selected, refresh }) => {
  const [open, setOpen] = useState(false);
  const [skill, setSkill] = useState({
    name: "",
    category: "",
    description: ""
  });

  
  useEffect(() => {
    if (selected) {
      setSkill({
        name: selected.name || "",
        category: selected.category || "",
        description: selected.description || ""
      });
      setOpen(true);
    }
  }, [selected]);

  const handleOpen = () => {
    setSkill({ name: "", category: "", description: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSkill({ name: "", category: "", description: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selected) {
      await API.put(`/skills/${selected.id}`, skill);
    } else {
      await API.post("/skills", skill);
    }

    refresh();
    handleClose();
  };

  return (
    <>
      
      <Button variant="contained" onClick={handleOpen}>
        Add Skill
      </Button>

     
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {selected ? "Update Skill" : "Add Skill"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Skill Name"
              value={skill.name}
              onChange={(e) => setSkill({ ...skill, name: e.target.value })}
              required
            />
            <TextField
              label="Category"
              value={skill.category}
              onChange={(e) =>
                setSkill({ ...skill, category: e.target.value })
              }
            />
            <TextField
              label="Description"
              multiline
              rows={2}
              value={skill.description}
              onChange={(e) =>
                setSkill({ ...skill, description: e.target.value })
              }
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {selected ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SkillForm;
