import {
  Table, TableBody, TableCell,
  TableHead, TableRow, Paper
} from "@mui/material";

const ProjectTable = ({ projects }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Project</TableCell>
            <TableCell>Assigned Personnel</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map(p => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.personnel}</TableCell>
              <TableCell>{p.start}</TableCell>
              <TableCell>{p.end}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ProjectTable;
