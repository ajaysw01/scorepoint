import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#b71c1c", // Dark red
    },
    secondary: {
      main: "#ffffff", // White
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
