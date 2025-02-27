import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const CreateSport = () => {
  const [sportName, setSportName] = useState("");
  const [category, setCategory] = useState("");

  const handleCreate = () => {
    console.log("Creating sport:", { sportName, category });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Sport
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Sport Name"
          variant="outlined"
          value={sportName}
          onChange={(e) => setSportName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Category"
          variant="outlined"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create
        </Button>
      </Box>
    </Container>
  );
};

export default CreateSport;
