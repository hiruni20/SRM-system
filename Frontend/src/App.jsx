import { useEffect, useState } from "react";
import { Container, Divider } from "@mui/material";
import API from "./Api/API";

import PersonnelForm from "./Components/Personnel/PersonnelForm";
import PersonnelTable from "./Components/Personnel/PersonnelTable";
import SkillForm from "./components/skills/SkillForm";
import SkillTable from "./components/skills/SkillTable";

const App = () => {
  const [personnel, setPersonnel] = useState([]);
  const [skills, setSkills] = useState([]);
  const [editPerson, setEditPerson] = useState(null);
  const [editSkill, setEditSkill] = useState(null);

  const load = async () => {
    setPersonnel((await API.get("/personnel")).data);
    setSkills((await API.get("/skills")).data);
  };

  useEffect(() => { load(); }, []);

  return (
    <Container>
      <h2>Personnel Management</h2>
      <PersonnelForm selected={editPerson} refresh={load} />
      <PersonnelTable list={personnel} onEdit={setEditPerson} refresh={load} />

      <Divider sx={{ my: 4 }} />

      <h2>Skill Management</h2>
      <SkillForm selected={editSkill} refresh={load} />
      <SkillTable list={skills} onEdit={setEditSkill} refresh={load} />
    </Container>
  );
};

export default App;
