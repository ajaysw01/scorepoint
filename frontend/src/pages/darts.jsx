import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FunFriday = () => {
    const navigate = useNavigate();
    const { sport_id } = useParams(); 
    const [teams, setTeams] = useState([]);
    const [teamPoints, setTeamPoints] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get("https://scorepoint.onrender.com/api/teams/");
                if (Array.isArray(response.data)) {
                    setTeams(response.data);
                } else {
                    console.error("Unexpected API response:", response.data);
                    setError("Invalid data format");
                }
            } catch (err) {
                console.error("Error fetching teams:", err);
                setError("Error loading teams");
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    useEffect(() => {
        const fetchAllTeamPoints = async () => {
            if (teams.length === 0 || !sport_id) return;

            const pointsData = {};
            await Promise.all(
                teams.map(async (team) => {
                    try {
                        const response = await axios.get(
                            `https://scorepoint.onrender.com/api/points/team/sport/${sport_id}/${team.id}`
                        );
                        pointsData[team.id] = response.data.total_points;
                    } catch (err) {
                        console.error(`Error fetching points for team ${team.id}:`, err);
                        pointsData[team.id] = 0;
                    }
                })
            );
            setTeamPoints(pointsData);
        };

        fetchAllTeamPoints();
    }, [teams, sport_id]);

    if (loading) return <div className="p-8">Loading...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Team Points</h1>
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
                <table className="w-full border-collapse shadow-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left font-semibold">Team</th>
                            <th className="p-3 text-left font-semibold">Total Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.length > 0 ? (
                            teams.map((team) => (
                                <tr key={team.id} className="border-b hover:bg-gray-100 transition">
                                    <td className="p-3 font-semibold">{team.name}</td>
                                    <td className="p-3 font-semibold text-blue-600">
                                        {teamPoints[team.id] !== undefined ? teamPoints[team.id] : "Loading..."}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="p-3 text-center text-gray-500">
                                    No teams found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Back Button */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition-all"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default FunFriday;
