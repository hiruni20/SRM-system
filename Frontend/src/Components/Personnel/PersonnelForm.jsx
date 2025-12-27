import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  DialogActions
} from "@mui/material";
import API from "../../Api/API.js";

const PersonnelForm = ({ selected, refresh }) => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    role: "",
    experience: ""
  });

  useEffect(() => {
    if (selected) {
      setData({
        name: selected.name || "",
        email: selected.email || "",
        role: selected.role || "",
        experience: selected.experience || ""
      });
      setOpen(true);
    }
  }, [selected]);

  const handleOpen = () => {
    setData({ name: "", email: "", role: "", experience: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setData({ name: "", email: "", role: "", experience: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selected) {
      await API.put(`/personnel/${selected.id}`, data);
    } else {
      await API.post("/personnel", data);
    }

    refresh();
    handleClose();
  };

  return (
    <>
      
      <Button variant="contained" onClick={handleOpen}>
        Add Personnel
      </Button>

      
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {selected ? "Update Personnel" : "Add Personnel"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
            <TextField
              label="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
            <TextField
              label="Role"
              value={data.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
            />
           {/*  <TextField
              label="Experience"
              value={data.experience}
              onChange={(e) =>
                setData({ ...data, experience: e.target.value })
              }
            /> */}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Experience</InputLabel>
              <Select
                name="Experience"
                value={data.experience}
                label="Experience"
                 onChange={(e) =>
                setData({ ...data, experience: e.target.value })
              }
              >
                <MenuItem value="Junior">Junior</MenuItem>
                <MenuItem value="Mid-Level">Mid-Level</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
              </Select>
            </FormControl>
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

export default PersonnelForm;
