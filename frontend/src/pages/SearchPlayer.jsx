import { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

const SearchPlayer = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null);
      const response = await axios.get(`http://localhost:8000/players/search?name=${playerName}`);
      setPlayerData(response.data);
    } catch {
      setError("Player not found");
      setPlayerData(null);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
      <TextField
        fullWidth
        label="Search Player"
        variant="outlined"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {playerData && (
        <Card style={{ marginTop: 20 }}>
          <CardContent>
            <Typography variant="h6">{playerData.name}</Typography>
            <Typography>Sport: {playerData.sport_name}</Typography>
            <Typography>Category: {playerData.sport_category}</Typography>
            <Typography>Player Points: {playerData.player_points}</Typography>
            <Typography>Team Points: {playerData.team_points}</Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchPlayer;
