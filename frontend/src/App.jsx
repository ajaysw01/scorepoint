import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import About from "./pages/about";
import Updates from "./pages/updates";
import Scores from "./pages/scores";
import Teams from "./pages/teams";
import Leaderboard from "./pages/leaderboard";
import PlayerRankings from "./pages/playerranking";
import GameScores from "./pages/commonscore";
import PlayerStats from "./pages/test";

// Sports Pages
import Cricket from "./pages/cricket";
import Badminton from "./pages/badminton";
import Tabletennis from "./pages/tabletennis";
import Carrom from "./pages/carrom";
import Funfriday from "./pages/funfriday";

// Rules Pages
import SportsDashboard from "./pages/rules";
import CricketRules from "./pages/cricketrules";
import CarromRules from "./pages/carromrules";
import TableTennisRules from "./pages/tabletennisrules";
import BadmintonRules from "./pages/badmintonrules";
import FunFridayRules from "./pages/funfridayrules";

// Admin & Protected Pages
import AdminDashboard from "./pages/adminDashboard";
import TeamsManagement from "./pages/teamsmanagement";
import EditScores from "./pages/editScores";
import Schedule from "./pages/schedule";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/updates" element={<Updates />} />

        {/* Scores & Rankings */}
        <Route path="/scores" element={<Scores />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/rankings" element={<PlayerRankings />} />
        <Route path="/:game_name/:sport_id/:category" element={<GameScores />} />
        <Route path="/test" element={<PlayerStats />} />

        {/* Sports Pages */}
        <Route path="/cricket" element={<Cricket />} />
        <Route path="/badminton" element={<Badminton />} />
        <Route path="/tabletennis" element={<Tabletennis />} />
        <Route path="/carrom" element={<Carrom />} />
        <Route path="/funfriday" element={<Funfriday />} />

        {/* Rules Pages */}
        <Route path="/rules" element={<SportsDashboard />} />
        <Route path="/cricketrules" element={<CricketRules />} />
        <Route path="/carromrules" element={<CarromRules />} />
        <Route path="/tabletennisrules" element={<TableTennisRules />} />
        <Route path="/badmintonrules" element={<BadmintonRules />} />
        <Route path="/funfridayrules" element={<FunFridayRules />} />

        {/* Protected Routes */}
        <Route path="/editscores" element={<ProtectedRoute><EditScores /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/teamsmangement" element={<ProtectedRoute><TeamsManagement /></ProtectedRoute>} />
        <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </Router>
  );
}

export default App;
