import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "#121212",
        color: "#bbb",
        padding: "15px 0",
        textAlign: "center",
        marginTop: "auto",
        fontSize: "14px",
        boxShadow: "0px -2px 8px rgba(0,0,0,0.2)",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} CreditSafe. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
