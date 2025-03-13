import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const categories = [
  "Cricket",
  "Carrom",
  "Table Tennis",
  "Darts",
  "Fun Friday",
  "Badminton",
];

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "https://scorepoint.onrender.com/api/points/leaderboard"
        );
        const leaderboardData = response.data;

        if (leaderboardData.length === 0) {
          setTeams([]);
        } else {
          const formattedTeams = leaderboardData
            .map((teamData) => {
              const scores = categories.map(
                (category) => teamData.sports[category] || 0
              );
              return {
                name: teamData.team,
                scores,
                total: teamData.total_points,
              };
            })
            .sort((a, b) => b.total - a.total);
          setTeams(formattedTeams);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-blue-700 py-4">
          🏆 Leaderboard 🏆
        </h1>

        {/* Loading / No Scores */}
        {loading ? (
          <p className="text-center text-lg py-4">Loading...</p>
        ) : teams.length === 0 ? (
          <p className="text-center text-lg py-4 font-semibold text-gray-600">
            No Scores Available
          </p>
        ) : (
          <div className="w-full">
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border border-gray-300">
                {/* Table Header */}
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg">
                    <th className="py-3 px-2 text-left">Rank</th>
                    <th className="py-3 px-4 text-left">Team</th>
                    {categories.map((category, i) => (
                      <th key={i} className="py-3 px-2 text-center">
                        {category}
                      </th>
                    ))}
                    <th className="py-3 px-2 text-center">Total</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {teams.map((team, index) => (
                    <tr
                      key={team.name}
                      className={`${
                        index === 0 ? "bg-yellow-400 font-bold" : "bg-gray-50"
                      } hover:shadow-lg hover:bg-gray-200 transition-all`}
                    >
                      <td className="py-3 px-2 text-center">{index + 1}</td>
                      <td className="py-3 px-4 font-semibold">{team.name}</td>
                      {team.scores.map((score, i) => (
                        <td key={i} className="py-3 px-2 text-center">
                          {score}
                        </td>
                      ))}
                      <td className="py-3 px-4 text-center font-bold text-blue-600">
                        {team.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {teams.map((team, index) => (
                <div
                  key={team.name}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold text-blue-700">
                      {index + 1}. {team.name}
                    </h2>
                    <span className="text-lg font-bold text-green-600">
                      {team.total} pts
                    </span>
                  </div>
                  <div className="space-y-1">
                    {categories.map((category, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-gray-700"
                      >
                        <span>{category}:</span>
                        <span className="font-semibold text-blue-600">
                          {team.scores[i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <button
          onClick={() => navigate("/scores")}
          className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition-all"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
