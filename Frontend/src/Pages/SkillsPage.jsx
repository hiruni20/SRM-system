import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import API from "../Api/API";

import SkillForm from "../Components/skills/SkillForm";
import SkillTable from "../Components/skills/SkillTable";

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [editSkill, setEditSkill] = useState(null);

  const load = async () => {
    const res = await API.get("/skills");
    setSkills(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container>
      <h2>Skill Management</h2>
      <SkillForm selected={editSkill} setSelected={setEditSkill} refresh={load} />
      <SkillTable list={skills} onEdit={setEditSkill} refresh={load} />
    </Container>
  );
};

export default SkillsPage;
