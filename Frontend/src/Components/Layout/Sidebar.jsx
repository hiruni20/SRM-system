import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";
import {
    Home,
    People,
    Build,
    Work,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    bgcolor: "#1e293b",
                    color: "#fff"//sx={{ width: 240,  height: "100vh", , p: 2 }}
                },
            }}
        >
            <Toolbar>
                <strong>SRM System</strong>
            </Toolbar>

            <List>
                <ListItemButton component={NavLink} to="/">
                    <ListItemIcon sx={{ color: "#fff" }}>
                        <Home />
                    </ListItemIcon>
                    <ListItemText primary="Home" sx={{ color: "#fff" }} />
                </ListItemButton>

                <ListItemButton component={NavLink} to="/personnel">
                    <ListItemIcon sx={{ color: "#fff" }}><People /></ListItemIcon>
                    <ListItemText primary="Manage Personnel" />
                </ListItemButton>

                <ListItemButton component={NavLink} to="/skills">
                    <ListItemIcon sx={{ color: "#fff" }}><Build /></ListItemIcon>
                    <ListItemText primary="Manage Skills" />
                </ListItemButton>

                <ListItemButton component={NavLink} to="/projects">
                    <ListItemIcon sx={{ color: "#fff" }}><Work /></ListItemIcon>
                    <ListItemText primary="Projects" />
                </ListItemButton>
            </List>
        </Drawer>
    );
};

export default Sidebar;
