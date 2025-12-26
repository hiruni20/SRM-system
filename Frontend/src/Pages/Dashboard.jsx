import { Box, Toolbar, CssBaseline } from "@mui/material";
import Sidebar from "../Components/Layout/Sidebar";

const Dashboard = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
          p: 3,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Dashboard;
