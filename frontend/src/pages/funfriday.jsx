import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const FunFriday = () => {
    const navigate = useNavigate();
    const { sport_id, team_id } = useParams();
    const [teamPoints, setTeamPoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeamPoints = async () => {
            try {
                const response = await axios.get(`https://scorepoint.onrender.com/api/points/team/sport/${sport_id}/${team_id}`);
                setTeamPoints(response.data);
            } catch {
                setError("Error loading data");
            } finally {
                setLoading(false);
            }
        };

        fetchTeamPoints();
    }, [sport_id, team_id]);

    if (loading) return <div className="p-8">Loading...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Points Table */}
            <motion.div className="p-6 bg-white shadow-lg rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800">Total Points</h3>
                <table className="mt-4 w-full border-collapse shadow-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left font-semibold">Team</th>
                            <th className="p-3 text-left font-semibold">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamPoints.map((team) => (
                            <tr key={team.id} className="border-b hover:bg-gray-100 transition">
                                <td className="p-3 font-semibold">{team.name}</td>
                                <td className="p-3 font-semibold text-blue-600">{team.total_points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

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
