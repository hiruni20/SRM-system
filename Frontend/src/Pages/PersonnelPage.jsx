import { useEffect, useState } from "react";
import { Container, Button } from "@mui/material";
import API from "../Api/API";

import PersonnelForm from "../Components/Personnel/PersonnelForm";
import PersonnelTable from "../Components/Personnel/PersonnelTable";
import AssignSkill from "../Components/PersonnelSkills/AssignSkill";
import AssignedSkillList from "../Components/PersonnelSkills/AssignedSkillList";

const PersonnelPage = () => {
  const [personnel, setPersonnel] = useState([]);
  const [editPerson, setEditPerson] = useState(null);
  const [openAssign, setOpenAssign] = useState(false);
 
const [editAssignedSkill, setEditAssignedSkill] = useState(null);

const handleEditAssignedSkill = (skill) => {
  setEditAssignedSkill(skill);
  setOpenAssign(true); // Open the Assign/Edit dialog
};

  const load = async () => {
    const res = await API.get("/personnel");
    setPersonnel(res.data);
  };
  
  useEffect(() => {
    load();
  }, []);

  return (
    <Container sx={{ mt: 3 }}>
      <h2>Personnel Management</h2>

      <PersonnelForm
        selected={editPerson}
        setSelected={setEditPerson}
        refresh={load}
      />

      <PersonnelTable
        list={personnel}
        onEdit={setEditPerson}
        refresh={load}
      />

      {/* Assign Skill Section */}
      <h2 style={{ marginTop: 40 }}>Personnel Skills</h2>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setOpenAssign(true)}
      >
        Assign Skill
      </Button>

      <AssignSkill
  open={openAssign}
  onClose={() => {
    setOpenAssign(false);
    setEditAssignedSkill(null);
  }}
  refresh={load}
  editSkill={editAssignedSkill} // pass the skill to edit
/>


     <AssignedSkillList
  onEdit={handleEditAssignedSkill} 
  refresh={load}
/>

  


    </Container>
  );
};

export default PersonnelPage;
