import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./pages/DashboardLayout";
import Leaderboard from "./pages/dashboard/Leaderboard";
import SearchPlayer from "./pages/SearchPlayer";

// Teams
import CreateTeam from "./pages/dashboard/Teams/CreateTeam";
import UpdateTeam from "./pages/dashboard/Teams/UpdateTeam";
import ShowAllTeams from "./pages/dashboard/Teams/ShowAllTeams";

// Sports
import CreateSport from "./pages/dashboard/Sports/CreateSport";
import ShowAllSports from "./pages/dashboard/Sports/ShowAllSports";

// Scores
import SubmitScore from "./pages/dashboard/Scores/SubmitScore";
import ShowAllScores from "./pages/dashboard/Scores/ShowAllScores";

const ProtectedRoute = ({ element }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? element : <Navigate to="/login" replace />;
};

const AdminRoute = ({ element }) => {
  const { user } = useSelector((state) => state.auth);
  return user?.role === "admin" ? (
    element
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/leaderboard" element={<Leaderboard />} />

      {/* Dashboard Layout */}
      <Route
        path="/dashboard/*"
        element={<DashboardLayout />}
        // element={<ProtectedRoute element={<DashboardLayout />} />}
      >
        {/* Teams */}
        <Route
          path="teams/create"
          element={<AdminRoute element={<CreateTeam />} />}
        />
        <Route
          path="teams/update"
          element={<AdminRoute element={<UpdateTeam />} />}
        />
        <Route path="teams/show" element={<ShowAllTeams />} />

        {/* Sports */}
        <Route
          path="sports/create"
          element={<AdminRoute element={<CreateSport />} />}
        />
        <Route path="sports/show" element={<ShowAllSports />} />

        {/* Players */}
        <Route path="players/search" element={<SearchPlayer />} />

        {/* Scores */}
        <Route
          path="scores/submit"
          element={<AdminRoute element={<SubmitScore />} />}
        />
        <Route path="scores/show" element={<ShowAllScores />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
