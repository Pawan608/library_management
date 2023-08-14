import * as React from "react";
import { NavLink, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./dashboard.css";
import { useTheme } from "@mui/material/styles";
import { Paper } from "@mui/material";

const drawerWidth = 300;

function ResponsiveDrawer(props) {
  const theme = useTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <Box sx={{ padding: "25px" }} backgroundColor={theme.palette.primary.light}>
        <Box sx={{ borderRadius: "25px", padding: "15px" }}>
          <h1>Library Mgmt System</h1>
        </Box>
      </Box>
      <Divider />
        <List className="nav-list" sx={{ padding: "50px" }}>
          <NavLink to="/" className="nav-link">
            <ListItem key="overview" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Overview" />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to="/books" className="nav-link">
            <ListItem key="books" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MenuBookIcon />
                </ListItemIcon>
                <ListItemText primary="Books" />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to="/members" className="nav-link">
            <ListItem key="members" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Members" />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to="/transactions" className="nav-link">
            <ListItem key="transcations" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary="Transcation" />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="main">
      <Box sx={{ display: "flex", }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
        </Box>
      </Box>
      <div style={{ flex: 4, margin: "1rem" }} >
        <Outlet />
      </div>
    </div>
  );
}

export default ResponsiveDrawer;
