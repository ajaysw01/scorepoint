import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const GameScores = () => {
  const { game_name, sport_id, category } = useParams();

  const navigate = useNavigate();

  const API_URL = `https://18.201.173.70/api/points/players/${sport_id}/${category}`;

  const [teams, setTeams] = useState([]);
  const [openTeam, setOpenTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerPoints = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetcha player points");
        }
        const data = await response.json();

        console.log(data);

        const groupedTeams = data.reduce((acc, player) => {
          const { team_name, name, total_points } = player;
          if (!acc[team_name]) {
            acc[team_name] = { teamName: team_name, teamScore: 0, players: [] };
          }
          acc[team_name].players.push({ name, score: total_points });
          acc[team_name].teamScore += total_points;
          return acc;
        }, {});

        setTeams(Object.values(groupedTeams));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerPoints();
  }, [API_URL]);

  const toggleDropdown = (teamName) => {
    setOpenTeam(openTeam === teamName ? null : teamName);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        {game_name}&nbsp;
        {category !== "none"
          ? category.replace("_", " ").toLowerCase()
          : ""}{" "}
        Scores
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : teams.length === 0 ? (
        <p className="text-center text-gray-500">No player points available</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {teams.map((team) => (
            <div
              key={team.teamName}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              {/* Team Score Card */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleDropdown(team.teamName)}
              >
                <h2 className="text-2xl font-semibold">{team.teamName}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">
                    {team.teamScore} pts
                  </span>
                  {openTeam === team.teamName ? (
                    <ChevronUp className="text-gray-600 transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="text-gray-600 transition-transform duration-300" />
                  )}
                </div>
              </div>

              {/* Player Scores Dropdown */}
              {openTeam === team.teamName && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Player Scores</h3>
                  <ul className="space-y-2">
                    {team.players.map((player, index) => (
                      <li
                        key={index}
                        className="flex justify-between bg-white p-2 rounded-md shadow-sm"
                      >
                        <span>{player.name}</span>
                        <span className="font-bold text-blue-600">
                          {player.score} pts
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Back Button */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="mt-12 px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition-all cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default GameScores;
