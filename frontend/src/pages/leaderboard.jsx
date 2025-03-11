import { useState, useEffect } from "react";
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
              ); // Fill missing categories with 0
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
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-4xl font-bold text-center text-blue-700 py-4">
          🏆 Leaderboard 🏆
        </h1>

        {loading ? (
          <p className="text-center text-lg py-4">Loading...</p>
        ) : teams.length === 0 ? (
          <p className="text-center text-lg py-4 font-semibold text-gray-600">
            No Scores Available
          </p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-300">
            <table className="w-full table-fixed border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg">
                  <th className="py-3 px-4 text-left w-16">Rank</th>
                  <th className="py-3 px-18 text-left w-48">Team</th>
                  {categories.map((category, i) => (
                    <th key={i} className="py-3 px-2 text-center">
                      {category}
                    </th>
                  ))}
                  <th className="py-3 px-4 text-center w-24">Total</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr
                    key={team.name}
                    className={`shadow-md ${
                      index === 0 ? "bg-yellow-400 font-bold" : "bg-gray-50"
                    } hover:shadow-lg hover:bg-gray-200 transition-all rounded-lg`}
                  >
                    <td className="py-3 px-4 text-lg text-center">
                      {index + 1}
                    </td>
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
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
