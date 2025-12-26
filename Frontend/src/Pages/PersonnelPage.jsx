import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import API from "../Api/API";

import PersonnelForm from "../Components/Personnel/PersonnelForm";
import PersonnelTable from "../Components/Personnel/PersonnelTable";

const PersonnelPage = () => {
  const [personnel, setPersonnel] = useState([]);
  const [editPerson, setEditPerson] = useState(null);

  const load = async () => {
    const res = await API.get("/personnel");
    setPersonnel(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container>
      <h2>Personnel Management</h2>
      <PersonnelForm selected={editPerson} setSelected={setEditPerson} refresh={load} />
      <PersonnelTable list={personnel} onEdit={setEditPerson} refresh={load} />
    </Container>
  );
};

export default PersonnelPage;
