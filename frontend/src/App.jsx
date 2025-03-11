import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";

import Scores from "./pages/scores";
import Teams from "./pages/teams";
import Leaderboard from "./pages/leaderboard";
import Cricket from "./pages/cricket";
import Badminton from "./pages/badminton";
import Tabletennis from "./pages/tabletennis";
import Carrom from "./pages/carrom";
import Darts from "./pages/darts";
import Funfriday from "./pages/funfriday";
import BCategoryDetails from "./pages/bcategorydetails";
import TTCategoryDetails from "./pages/ttcategorydetails";
import CCategoryDetails from "./pages/ccategorydetails";
import Login from "./pages/login";
import AdminDashboard from "./pages/adminDashboard";
import Updates from "./pages/updates";
import SportsDashboard from "./pages/rules";
import TeamsManagement from "./pages/teamsmanagement";
import EditScores from "./pages/editScores";
import Schedule from "./pages/schedule";
import { Navigate } from "react-router-dom";
import PlayerStats from "./pages/test";

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
        <Route path="/scores" element={<Scores />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/cricket" element={<Cricket />} />
        <Route path="/badminton" element={<Badminton />} />
        <Route path="/badminton/:categoryName" element={<BCategoryDetails />} />
        <Route
          path="/tabletennis/:categoryName"
          element={<TTCategoryDetails />}
        />
        <Route path="/carrom/:categoryName" element={<CCategoryDetails />} />
        <Route path="/tabletennis" element={<Tabletennis />} />
        <Route path="/carrom" element={<Carrom />} />
        <Route path="/darts" element={<Darts />} />
        <Route path="/funfriday" element={<Funfriday />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rules" element={<SportsDashboard />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/test" element={<PlayerStats/>}/>
        <Route
          path="/editscores"
          element={
            <ProtectedRoute><EditScores /></ProtectedRoute>
              
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
    </Router>
  );
}

export default App;
