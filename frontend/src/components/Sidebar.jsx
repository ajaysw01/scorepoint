import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  SportsSoccer,
  People,
  Scoreboard,
  Person,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState({
    teams: false,
    sports: false,
    players: false,
    scores: false,
  });

  const handleToggle = (menu) => {
    setOpenMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
          background: "#121212", // Dark Sidebar
          color: "white",
        },
      }}
    >
      <Box sx={{ overflowY: "auto", padding: "10px" }}>
        <List>
          {/* TEAMS MENU */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleToggle("teams")}>
              <People sx={{ marginRight: 1 }} />
              <ListItemText primary="Teams" />
              {openMenu.teams ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openMenu.teams} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to="/dashboard/teams/create"
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Create Team" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/dashboard/teams/update"
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Update Teams" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/dashboard/teams/show"
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Show All Teams" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* SPORTS MENU */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleToggle("sports")}>
              <SportsSoccer sx={{ marginRight: 1 }} />
              <ListItemText primary="Sports" />
              {openMenu.sports ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openMenu.sports} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to="/dashboard/sports/create"
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Create Sport" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/dashboard/sports/show"
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Show All Sports" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* SCORES MENU */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleToggle("scores")}>
              <Scoreboard sx={{ marginRight: 1 }} />
              <ListItemText primary="Scores" />
              {openMenu.scores ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openMenu.scores} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to="/dashboard/scores/submit"
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Submit Score" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/dashboard/scores/show"
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Show All Scores" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
