import Navbar from './assets/navbar'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './assets/home'
import Scores from './assets/scores'
import Teams from './assets/teams'
import Leaderboard from './assets/leaderboard'
import Cricket from './assets/cricket'
import Badminton from './assets/badminton'
import Tabletennis from './assets/tabletennis'
import Carrom from './assets/carrom'
import Darts from './assets/darts'
import Funfriday from './assets/funfriday'
import BCategoryDetails from './assets/bcategorydetails'
import TTCategoryDetails from './assets/ttcategorydetails'
import CCategoryDetails from './assets/ccategorydetails'
import Login from './assets/login'
import AdminDashboard from './assets/adminDashboard'
import Updates from './assets/updates'
import SportsDashboard from './assets/rules';
import TeamsManagement from './assets/teamsmanagement';
import EditScores from './assets/editscores';
import Schedule from './assets/schedule';
import { Navigate } from 'react-router-dom';



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
                <Route path="/tabletennis/:categoryName" element={<TTCategoryDetails />} />
                <Route path="/carrom/:categoryName" element={<CCategoryDetails />} />
                <Route path="/tabletennis" element={<Tabletennis />} />
                <Route path="/carrom" element={<Carrom />} />
                <Route path="/darts" element={<Darts />} />
                <Route path="/funfriday" element={<Funfriday />} />
                <Route path="/login" element={<Login />} />
                <Route path="/rules" element={<SportsDashboard />} />
                <Route path="/updates" element={<Updates />} />
                <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>} />
                <Route path="/teamsmangement" element={<ProtectedRoute><TeamsManagement /></ProtectedRoute>} />
                <Route path="/editscores" element={<ProtectedRoute><EditScores /></ProtectedRoute>} />
                <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
                
            </Routes>
        </Router>
    )
}

export default App;
