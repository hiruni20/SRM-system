import { Table, TableRow, TableCell, TableHead, TableBody, Button } from "@mui/material";
import API from "../../Api/API.js";

const SkillTable = ({ list, onEdit, refresh }) => {
  const remove = async (id) => {
    await API.delete(`/skills/${id}`);
    refresh();
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {list.map(s => (
          <TableRow key={s.id}>
            <TableCell>{s.name}</TableCell>
            <TableCell>{s.category}</TableCell>
            <TableCell>{s.description}</TableCell>
            <TableCell>
              <Button onClick={() => onEdit(s)}>Edit</Button>
              <Button color="error" onClick={() => remove(s.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SkillTable;
