import { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

const SearchPlayer = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerData, setPlayerData] = useState([]); // ✅ Ensure it's always an array
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null);
      const response = await axios.get(`http://localhost:8000/api/players/search?name=${playerName}`);
      console.log(response.data);
      // ✅ Ensure response is a list
      setPlayerData(Array.isArray(response.data) ? response.data : []);
    } catch {
      setError("No players found");
      setPlayerData([]); // ✅ Reset data on error
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

      {error && <Typography color="error" style={{ marginTop: 10 }}>{error}</Typography>}

      {playerData.length > 0 ? (
        playerData.map((player, index) => (
          <Card key={index} style={{ marginTop: 20 }}>
            <CardContent>
              <Typography variant="h6">{player.player_name || "Unknown Player"}</Typography>
              <Typography>Sport: {player.sport_name || "Not Available"}</Typography>
              <Typography>Category: {player.sport_category || "Not Available"}</Typography>
              <Typography>Player Points: {player.player_points ?? "Not Available"}</Typography>
              <Typography>Team Points: {player.team_points ?? "Not Available"}</Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        !error && <Typography style={{ marginTop: 20 }}>No players found</Typography>
      )}
    </div>
  );
};

export default SearchPlayer;
