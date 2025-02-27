import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const SubmitScore = () => {
  const [playerId, setPlayerId] = useState("");
  const [sportId, setSportId] = useState("");
  const [points, setPoints] = useState("");

  const handleSubmit = () => {
    console.log("Submitting score:", { playerId, sportId, points });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Submit Score
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Player ID"
          variant="outlined"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          fullWidth
        />
        <TextField
          label="Sport ID"
          variant="outlined"
          value={sportId}
          onChange={(e) => setSportId(e.target.value)}
          fullWidth
        />
        <TextField
          label="Points"
          variant="outlined"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default SubmitScore;
