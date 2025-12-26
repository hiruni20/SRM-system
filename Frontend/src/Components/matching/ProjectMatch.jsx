import { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";
import API from "../../Api/API.js";

const ProjectMatch = () => {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    API.get("/projects").then(res => setProjects(res.data));
  }, []);

  const findMatches = async () => {
    const res = await API.get(`/match/${projectId}`);
    setMatches(res.data);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <h2>🎯 Project → Personnel Matching</h2>

      <TextField
        select
        fullWidth
        label="Select Project"
        value={projectId}
        onChange={e => setProjectId(e.target.value)}
        sx={{ mb: 2 }}
      >
        {projects.map(p => (
          <MenuItem key={p.id} value={p.id}>
            {p.name}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="contained"
        disabled={!projectId}
        onClick={findMatches}
      >
        Find Best Matches
      </Button>

      {matches.length > 0 && (
        <Table sx={{ mt: 3 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Skills</TableCell>
              <TableCell>Match %</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {matches.map((m, i) => (
              <TableRow key={i}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell>
                  {m.skills.map(s => `${s.skill} (${s.level})`).join(", ")}
                </TableCell>
                <TableCell>{m.matchScore}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default ProjectMatch;
