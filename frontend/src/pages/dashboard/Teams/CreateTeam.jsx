import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTeam } from "../../../features/teamSlice";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";

const CreateTeam = () => {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([{ name: "" }]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user?.token);
  const { loading, error, teams } = useSelector((state) => state.team);

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (teams.length > 0) {
      toast.success("Team created successfully!");
      setName("");
      setPlayers([{ name: "" }]);
    }
  }, [error, teams]); // ✅ Runs when Redux state changes

  const handlePlayerChange = (index, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].name = value;
    setPlayers(updatedPlayers);
  };

  const addPlayer = () => {
    setPlayers([...players, { name: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Unauthorized! Please log in.");
      return;
    }

    dispatch(createTeam({ teamData: { name, players }, token }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", p: 2 }}
    >
      <Typography variant="h5" mb={2}>
        Create a New Team
      </Typography>
      <TextField
        fullWidth
        label="Team Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {players.map((player, index) => (
        <TextField
          key={index}
          fullWidth
          label={`Player ${index + 1}`}
          value={player.name}
          onChange={(e) => handlePlayerChange(index, e.target.value)}
          required
          sx={{ mt: 1 }}
        />
      ))}
      <Button onClick={addPlayer} variant="outlined" sx={{ mt: 1 }}>
        Add Player
      </Button>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Create"}
      </Button>
    </Box>
  );
};

export default CreateTeam;
