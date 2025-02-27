import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./pages/DashboardLayout";
import Leaderboard from "./pages/dashboard/Leaderboard";

// Teams
import CreateTeam from "./pages/dashboard/Teams/CreateTeam";
import UpdateTeams from "./pages/dashboard/Teams/UpdateTeams";
import ShowAllTeams from "./pages/dashboard/Teams/ShowAllTeams";

// Sports
import CreateSport from "./pages/dashboard/Sports/CreateSport";
import ShowAllSports from "./pages/dashboard/Sports/ShowAllSports";

// // Players
// import AddPlayer from "./pages/dashboard/Players/AddPlayer";
// import UpdatePlayers from "./pages/dashboard/Players/UpdatePlayers";
// import ShowAllPlayers from "./pages/dashboard/Players/ShowAllPlayers";

// Scores
import SubmitScore from "./pages/dashboard/Scores/SubmitScore";
import ShowAllScores from "./pages/dashboard/Scores/ShowAllScores";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/leaderboard" element={<Leaderboard />} />

      {/* Dashboard Layout with Nested Routes */}
      <Route path="/dashboard/*" element={<DashboardLayout />}>
        {/* Teams */}
        <Route path="teams/create" element={<CreateTeam />} />
        <Route path="teams/update" element={<UpdateTeams />} />
        <Route path="teams/show" element={<ShowAllTeams />} />

        {/* Sports */}
        <Route path="sports/create" element={<CreateSport />} />
        <Route path="sports/show" element={<ShowAllSports />} />

        {/* Players
        <Route path="players/add" element={<AddPlayer />} />
        <Route path="players/update" element={<UpdatePlayers />} />
        <Route path="players/show" element={<ShowAllPlayers />} /> */}

        {/* Scores */}
        <Route path="scores/submit" element={<SubmitScore />} />
        <Route path="scores/show" element={<ShowAllScores />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
