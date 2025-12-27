import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import API from "../../Api/API.js";

const AssignedSkillList = ({ onEdit }) => {
  const [assignedSkills, setAssignedSkills] = useState([]);

  // Fetch assigned skills
  const loadAssignedSkills = async () => {
    try {
      const res = await API.get("/skills/assign");
      setAssignedSkills(res.data);
    } catch (err) {
      console.error("Failed to fetch assigned skills:", err);
    }
  };

  useEffect(() => {
    loadAssignedSkills();
  }, []);

  // Delete assigned skill with confirmation
  const remove = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this assigned skill?");
    if (!confirm) return;

    try {
      await API.delete(`/skills/assign/${id}`);
      // Refresh list after deletion
      loadAssignedSkills();
    } catch (err) {
      console.error(err);
      alert("Failed to delete assigned skill");
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Personnel Name</TableCell>
          <TableCell>Assigned Skill</TableCell>
          <TableCell>Proficiency Level</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {assignedSkills.length > 0 ? (
          assignedSkills.map((skill) => (
            <TableRow key={skill.id}>
              <TableCell>{skill.personnel_name}</TableCell>
              <TableCell>{skill.skill_name}</TableCell>
              <TableCell>{skill.proficiency}</TableCell>
              <TableCell>
                <Button
                 
                  onClick={() => onEdit(skill)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  
                  color="error"
                  onClick={() => remove(skill.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} align="center">
              No assigned skills found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AssignedSkillList;
