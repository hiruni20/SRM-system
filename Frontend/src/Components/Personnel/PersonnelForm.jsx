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
  DialogActions,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import API from "../../Api/API.js";

const PersonnelForm = ({ selected, refresh }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [data, setData] = useState({
    name: "",
    email: "",
    role: "",
    experience: "",
  });

  useEffect(() => {
    if (selected) {
      setData({
        name: selected.name || "",
        email: selected.email || "",
        role: selected.role || "",
        experience: selected.experience || "",
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

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        fullScreen={fullScreen}
      >
        <DialogTitle>
          {selected ? "Update Personnel" : "Add Personnel"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              fullWidth
              label="Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />

            <TextField
              fullWidth
              label="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />

            <TextField
              fullWidth
              label="Role"
              value={data.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
            />

            <FormControl fullWidth>
              <InputLabel>Experience</InputLabel>
              <Select
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

        <DialogActions
          sx={{
            flexDirection: fullScreen ? "column" : "row",
            gap: 2,
            px: 3,
            pb: 2,
          }}
        >
          <Button fullWidth={fullScreen} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            fullWidth={fullScreen}
            variant="contained"
            onClick={handleSubmit}
          >
            {selected ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PersonnelForm;
