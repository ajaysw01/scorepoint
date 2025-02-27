import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Register = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Name" variant="outlined" fullWidth />
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary">
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
