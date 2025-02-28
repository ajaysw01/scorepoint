import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth); // 🔹 Get user from Redux

  if (!user) {
    return <Navigate to="/login" replace />; // 🔹 Redirect unauthorized users
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* Header */}
        <Header />

        {/* Main Content */}
        <Box
          component="main"
          sx={{ flexGrow: 1, padding: 3, overflowY: "auto" }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
