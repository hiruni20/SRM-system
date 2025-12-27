import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Home, People, Build, Work } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;
const miniDrawerWidth = 72;

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isMobile ? miniDrawerWidth : drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isMobile ? miniDrawerWidth : drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#1e293b",
          color: "#fff",
          overflowX: "hidden",
        },
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        {!isMobile && (
          <Typography variant="h6" fontWeight="bold">
            SRM System
          </Typography>
        )}
      </Toolbar>

      <List>
        <SidebarItem to="/" icon={<Home />} text="Home" isMobile={isMobile} />
        <SidebarItem
          to="/personnel"
          icon={<People />}
          text="Manage Personnel"
          isMobile={isMobile}
        />
        <SidebarItem
          to="/skills"
          icon={<Build />}
          text="Manage Skills"
          isMobile={isMobile}
        />
        <SidebarItem
          to="/projects"
          icon={<Work />}
          text="Projects"
          isMobile={isMobile}
        />
      </List>
    </Drawer>
  );
};

const SidebarItem = ({ to, icon, text, isMobile }) => (
  <ListItemButton
    component={NavLink}
    to={to}
    sx={{
      justifyContent: isMobile ? "center" : "flex-start",
      px: isMobile ? 2 : 3,
      "&.active": {
        bgcolor: "#334155",
      },
    }}
  >
    <ListItemIcon
      sx={{
        color: "#fff",
        minWidth: isMobile ? "auto" : 40,
        justifyContent: "center",
      }}
    >
      {icon}
    </ListItemIcon>

    {!isMobile && <ListItemText primary={text} />}
  </ListItemButton>
);

export default Sidebar;
