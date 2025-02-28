import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSport } from "../../../features/sportSlice";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { toast } from "react-toastify";

const CreateSport = () => {
  const [sportName, setSportName] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user?.token);
  const { loading, error, sports } = useSelector((state) => state.sports);

  // Debug: Check if token is retrieved
  useEffect(() => {
    console.log("User token from Redux:", token);
  }, [token]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (sports.length > 0) {
      toast.success("Sport created successfully!");
      setSportName("");
    }
  }, [error, sports]); // ✅ Runs when Redux state changes

  const handleCreate = (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Unauthorized! Please log in.");
      return;
    }

    console.log("Dispatching createSport with:", { name: sportName, token });
    dispatch(createSport({ sportData: { name: sportName }, token }));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Sport
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Sport Name"
          variant="outlined"
          value={sportName}
          onChange={(e) => setSportName(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Create"}
        </Button>
      </Box>
    </Container>
  );
};

export default CreateSport;
