import { Grid } from "@mui/material";
import TopStats from "../Components/Layout/TopStats";
import DashProjectTable from "../Components/projects/DashProjectTable";
//import ProjectChart from "../Components/projects/ProjectChart";

const Home = () => {
  const projects = [
    { id: 1, name: "HR System", personnel: "Hiruni", start: "2024-01-01", end: "2024-06-01" },
    { id: 2, name: "SRM App", personnel: "Kasuni", start: "2024-02-01", end: "2024-08-01" },
  ];

  const chartData = [
    { name: "Completed", value: 4 },
    { name: "In Progress", value: 3 },
    { name: "Pending", value: 2 },
  ];

  return (
    <>
      <TopStats projects={5} personnel={12} skills={20} />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <DashProjectTable projects={projects} />
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <ProjectChart data={chartData} />
        </Grid> */}
      </Grid>
    </>
  );
};

export default Home;
