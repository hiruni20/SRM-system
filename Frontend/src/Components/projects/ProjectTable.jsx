import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import API from "../../Api/API.js";

const ProjectTable = ({ list, onEdit, refresh }) => {
  const remove = async (id) => {
    await API.delete(`/projects/${id}`);
    refresh();
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Start</TableCell>
          <TableCell>End</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {list.map(p => (
          <TableRow key={p.id}>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.status}</TableCell>
            <TableCell>{p.startDate}</TableCell>
            <TableCell>{p.endDate}</TableCell>
            <TableCell>
              <Button onClick={() => onEdit(p)}>Edit</Button>
              <Button color="error" onClick={() => remove(p.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProjectTable;
