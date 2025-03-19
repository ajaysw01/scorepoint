import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Scores from "./pages/scores";
import Teams from "./pages/teams";
import Leaderboard from "./pages/leaderboard";
import Badminton from "./pages/badminton";
import Tabletennis from "./pages/tabletennis";
import Carrom from "./pages/carrom";
import Funfriday from "./pages/funfriday";
import GameScores from "./pages/commonscore";
import Login from "./pages/login";
import AdminDashboard from "./pages/adminDashboard";
import Updates from "./pages/updates";
import SportsDashboard from "./pages/rules";
import TeamsManagement from "./pages/teamsmanagement";
import EditScores from "./pages/editScores";
import Schedule from "./pages/schedule";
import { Navigate } from "react-router-dom";
import PlayerStats from "./pages/test";
import AddScore from "./pages/addScore";
import CricketRules from './pages/cricketrules';
import CarromRules from "./pages/carromrules";
import TableTennisRules from "./pages/tabletennisrules";
import BadmintonRules from "./pages/badmintonrules";
import FunFridayRules from "./pages/funfridayrules";
import Cricket from "./pages/cricket";
import About from "./pages/about";

import PlayerRankings from "./pages/playerranking";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addScore" element={<AddScore />} />
        <Route path="/scores" element={<Scores />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/rankings" element={<PlayerRankings />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/badminton" element={<Badminton />} />
        <Route
          path="/:game_name/:sport_id/:category"
          element={<GameScores />}
        />
        {/* <Route path="/badminton/:sport_id/:category" element={<BCategoryDetails />} />
        <Route path="/tabletennis/:sport_id/:category" element={<TTCategoryDetails />}/>
        <Route path="/carrom/:sport_id/:category" element={<CCategoryDetails />} /> */}
        <Route path="/tabletennis" element={<Tabletennis />} />
        <Route path="/carrom" element={<Carrom />} />
        <Route path="/funfriday" element={<Funfriday />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rules" element={<SportsDashboard />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/test" element={<PlayerStats/>}/>
        <Route path="/cricketrules" element={<CricketRules />} />
        <Route path="/carromrules" element={<CarromRules/>} />
        <Route path="/tabletennisrules" element={<TableTennisRules/>} />
        <Route path="/badmintonrules" element={<BadmintonRules/>} />
        <Route path="/funfridayrules" element={<FunFridayRules/>} />
        <Route path="/cricket" element={<Cricket/>} />
        <Route path="/about" element={<About/>} />

        <Route
          path="/editscores"
          element={
            <ProtectedRoute>
              <EditScores />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teamsmangement"
          element={
            <ProtectedRoute>
              <TeamsManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <Schedule />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
