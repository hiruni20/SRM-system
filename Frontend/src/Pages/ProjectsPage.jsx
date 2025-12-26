import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import API from "../Api/API";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [open, setOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [formData, setFormData] = useState({
  name: "",
  description: "",
  start_date: "",
  end_date: "",
  status: "",
  personnelId: "",
});

  // Load projects + personnel
  const loadData = async () => {
    const projRes = await API.get("/projects");
    setProjects(projRes.data);
    const perRes = await API.get("/personnel");
    setPersonnel(perRes.data);
    
  };

  useEffect(() => {
    loadData();
  }, []);

  // Open form
  const handleOpen = (proj = null) => {
    setEditProject(proj);
    if (proj) {
  setFormData({
    name: proj.name,
    description: proj.description,
    start_date: proj.start_date,
    end_date: proj.end_date, // fix here
    status: proj.status,
    personnelId: proj.personnelId || "",
  });
}else {
      setFormData({ name: "", description: "", start_date: "", end_date: "", status:"",personnelId: "" });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditProject(null);
  };

  // Handle form change
  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  // Submit project (create/update)
  const handleSubmit = async () => {
  try {
    if (editProject) {
      // UPDATE
      await API.put(`/projects/${editProject.id}`, {
        name: formData.name,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date,
        status: formData.status,
      });
    } else {
      // CREATE
      await API.post("/projects", {
        name: formData.name,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date,
        status: formData.status,
      });
    }

    loadData();
    handleClose();
  } catch (err) {
    console.error("Project submit error:", err);
  }
};


  // Delete project
 const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this project?")) return;

  try {
    await API.delete(`/projects/${id}`);
    loadData();
  } catch (err) {
    console.error("Delete failed:", err);
  }
};

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Projects Management
      </Typography>

      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Project
      </Button>

      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>description</TableCell>
            {/* <TableCell>Assigned Personnel</TableCell> */}
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
             <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((proj) => (
            <TableRow key={proj.id}>
              <TableCell>{proj.name}</TableCell>
              <TableCell>{proj.description}</TableCell>
              <TableCell>{proj.start_date}</TableCell>
              <TableCell>{proj.end_date}</TableCell>
               <TableCell>{proj.status}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleOpen(proj)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(proj.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Project Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editProject ? "Edit Project" : "Add Project"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Project Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                name="start_date"
                InputLabelProps={{ shrink: true }}
                value={formData.start_date}
                onChange={handleChange}
              />
            </Grid>
            
             <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                name="end_date"
                InputLabelProps={{ shrink: true }}
                value={formData.end_date}
                onChange={handleChange}
              />
            </Grid>
           <FormControl fullWidth sx={{ mt: 2 }}>
  <InputLabel>Status</InputLabel>
  <Select
    name="status"
    value={formData.status}
    label="Status"
    onChange={handleChange}
  >
    <MenuItem value="Planning">Planning</MenuItem>
    <MenuItem value="Active">Active</MenuItem>
    <MenuItem value="Completed">Completed</MenuItem>
  </Select>
</FormControl>

          </Grid>

          {/* <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Assign Personnel</InputLabel>
            <Select
              name="personnelId"
              value={formData.personnelId}
              label="Assign Personnel"
              onChange={handleChange}
            >
              {personnel.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editProject ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectsPage;
