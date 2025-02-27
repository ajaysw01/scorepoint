import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

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

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 3 }}>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
