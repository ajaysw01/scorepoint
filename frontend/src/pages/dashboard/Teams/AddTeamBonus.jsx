import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeamBonus } from "../../../features/teamSlice";
import { Button, TextField, Box, Typography } from "@mui/material";

const AddTeamBonus = ({ teamId, sportId }) => {
  const [bonus, setBonus] = useState(0);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user?.token); // 🔹 Get JWT token

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) return alert("Unauthorized! Please log in.");
    dispatch(addTeamBonus({ teamId, sportId, bonus, token }));
    setBonus(0);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", p: 2 }}
    >
      <Typography variant="h5" mb={2}>
        Add Bonus Points
      </Typography>
      <TextField
        type="number"
        fullWidth
        label="Bonus Points"
        value={bonus}
        onChange={(e) => setBonus(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Add
      </Button>
    </Box>
  );
};

export default AddTeamBonus;
