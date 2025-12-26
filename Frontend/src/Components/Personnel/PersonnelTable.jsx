import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import API from "../../Api/API.js";

const PersonnelTable = ({ list, onEdit, refresh }) => {
  const remove = async (id) => {
    await API.delete(`/personnel/${id}`);
    refresh();
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Experience</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {list.map(p => (
          <TableRow key={p.id}>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.email}</TableCell>
            <TableCell>{p.role}</TableCell>
            <TableCell>{p.experience}</TableCell>
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

export default PersonnelTable;
