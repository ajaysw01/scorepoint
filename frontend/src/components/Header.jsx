import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#1e1e1e",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
        paddingX: 2,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "#fff",
            fontWeight: "bold",
            transition: "0.3s",
            "&:hover": { color: "#e63946" },
          }}
        >
          CreditSafe
        </Typography>

        {/* Navigation Links & Search Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Typography
            component={Link}
            to="/scores"
            sx={{
              color: "#ddd",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: 500,
              transition: "0.3s",
              "&:hover": { color: "#e63946" },
            }}
          >
            Scores
          </Typography>
          <Typography
            component={Link}
            to="/leaderboard"
            sx={{
              color: "#ddd",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: 500,
              transition: "0.3s",
              "&:hover": { color: "#e63946" },
            }}
          >
            Leaderboard
          </Typography>

          {/* Search Icon (Links to Search Player Page) */}
          <IconButton component={Link} to="/dashboard/players/search" sx={{ color: "#fff" }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
