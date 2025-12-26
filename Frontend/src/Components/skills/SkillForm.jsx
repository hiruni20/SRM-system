import { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
import API from "../../Api/API.js";


const SkillForm = ({ selected, refresh }) => {
  const [skill, setSkill] = useState({ name: "", category: "", description: "" });

  useEffect(() => {
    if (selected) setSkill(selected);
  }, [selected]);

  const submit = async (e) => {
    e.preventDefault();
    selected
      ? await API.put(`/skills/${selected.id}`, skill)
      : await API.post("/skills", skill);

    refresh();
    setSkill({ name: "", category: "", description: "" });
  };

  return (
    <form onSubmit={submit}>
      <Stack spacing={2}>
        <TextField label="Skill Name" value={skill.name}
          onChange={e => setSkill({ ...skill, name: e.target.value })} />
        <TextField label="Category" value={skill.category}
          onChange={e => setSkill({ ...skill, category: e.target.value })} />
        <TextField label="Description" multiline rows={2}
          value={skill.description}
          onChange={e => setSkill({ ...skill, description: e.target.value })} />

        <Button variant="contained" type="submit">
          {selected ? "Update" : "Add"} Skill
        </Button>
      </Stack>
    </form>
  );
};

export default SkillForm;
