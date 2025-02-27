import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const CreateTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState("");

  const handleCreate = () => {
    console.log("Creating team:", { teamName, players });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Team
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Team Name"
          variant="outlined"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Player IDs (comma-separated)"
          variant="outlined"
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create
        </Button>
      </Box>
    </Container>
  );
};

export default CreateTeam;
