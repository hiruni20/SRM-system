import { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
import API from "../../Api/API.js";

const PersonnelForm = ({ selected, refresh }) => {
  const [data, setData] = useState({
    name: "", email: "", role: "", experience: ""
  });

  useEffect(() => {
    if (selected) setData(selected);
  }, [selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selected) {
    await API.put(`/personnel/${selected.id}`, data);
     
  } else {
    await API.post("/personnel", data);
  }

    refresh();
    
  
    setData({ name: "", email: "", role: "", experience: "" });
  };
 

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField label="Name" value={data.name}
          onChange={e => setData({ ...data, name: e.target.value })} required />
        <TextField label="Email" value={data.email}
          onChange={e => setData({ ...data, email: e.target.value })} required />
        <TextField label="Role" value={data.role}
          onChange={e => setData({ ...data, role: e.target.value })} />
        <TextField label="Experience" value={data.experience}
          onChange={e => setData({ ...data, experience: e.target.value })} />

        <Button variant="contained" type="submit">
          {selected ? "Update" : "Add"} Personnel
        </Button>
        
      </Stack>
    </form>
  );
};

export default PersonnelForm;
