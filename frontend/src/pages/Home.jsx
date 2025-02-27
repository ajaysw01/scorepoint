import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Welcome to CreditSafe ScorePoint
      </Typography>
      <Typography variant="body1">
        Track your teams, players, scores, and leaderboard.
      </Typography>
    </Box>
  );
};

export default Home;
