import { useEffect, useState } from "react";
import { TextField, Button, Stack, MenuItem } from "@mui/material";
import API from "../../Api/API.js";

const ProjectForm = ({ selected, refresh }) => {
  const [project, setProject] = useState({
    name: "", description: "", startDate: "", endDate: "", status: "Planning"
  });

  useEffect(() => {
    if (selected) setProject(selected);
  }, [selected]);

  const submit = async (e) => {
    e.preventDefault();
    selected
      ? await API.put(`/projects/${selected.id}`, project)
      : await API.post("/projects", project);

    refresh();
    setProject({ name: "", description: "", startDate: "", endDate: "", status: "Planning" });
  };

  return (
    <form onSubmit={submit}>
      <Stack spacing={2}>
        <TextField label="Project Name" required
          value={project.name}
          onChange={e => setProject({ ...project, name: e.target.value })} />

        <TextField label="Description" multiline rows={2}
          value={project.description}
          onChange={e => setProject({ ...project, description: e.target.value })} />

        <TextField type="date" label="Start Date" InputLabelProps={{ shrink: true }}
          value={project.startDate}
          onChange={e => setProject({ ...project, startDate: e.target.value })} />

        <TextField type="date" label="End Date" InputLabelProps={{ shrink: true }}
          value={project.endDate}
          onChange={e => setProject({ ...project, endDate: e.target.value })} />

        <TextField select label="Status"
          value={project.status}
          onChange={e => setProject({ ...project, status: e.target.value })}>
          <MenuItem value="Planning">Planning</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>

        <Button type="submit" variant="contained">
          {selected ? "Update" : "Create"} Project
        </Button>
      </Stack>
    </form>
  );
};

export default ProjectForm;
