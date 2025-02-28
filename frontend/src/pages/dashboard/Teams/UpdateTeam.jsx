import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTeam } from "../../../features/teamSlice";
import { Button, TextField, Box, Typography } from "@mui/material";

const UpdateTeam = ({ teamId }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user?.token); // 🔹 Get JWT token

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) return alert("Unauthorized! Please log in.");
    dispatch(updateTeam({ teamId, teamData: { name }, token }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", p: 2 }}
    >
      <Typography variant="h5" mb={2}>
        Update Team
      </Typography>
      <TextField
        fullWidth
        label="New Team Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Update
      </Button>
    </Box>
  );
};

export default UpdateTeam;
