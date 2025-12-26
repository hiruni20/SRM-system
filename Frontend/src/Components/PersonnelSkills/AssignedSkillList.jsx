import { useEffect, useState } from "react";
import axios from "axios";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AssignedSkillList({ personnelId }) {
  const [assigned, setAssigned] = useState([]);

  useEffect(() => {
    if (personnelId) {
      axios
        .get(`/api/personnel-skills/${personnelId}`)
        .then(res => setAssigned(res.data));
    }
  }, [personnelId]);

  const handleDelete = async id => {
    await axios.delete(`/api/personnel-skills/${id}`);
    setAssigned(prev => prev.filter(s => s.id !== id));
  };

  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Typography variant="h6">Assigned Skills</Typography>

      <List>
        {assigned.map(skill => (
          <ListItem
            key={skill.id}
            secondaryAction={
              <IconButton onClick={() => handleDelete(skill.id)}>
                <DeleteIcon color="error" />
              </IconButton>
            }
          >
            <ListItemText primary={skill.skill_name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
