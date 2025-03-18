import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function PlayerDetails({ playerId, onBack }) {
  const [playerHistory, setPlayerHistory] = useState(null);

  useEffect(() => {
    axios
      .get(`https://scorepoint.onrender.com/api/points/player/${playerId}/history`)
      .then((response) => setPlayerHistory(response.data))
      .catch((error) => console.error("Error fetching player history:", error));
  }, [playerId]);

  if (!playerHistory) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      {/* Player Info */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">{playerHistory.player_name}</h2>
        <p className="text-lg font-semibold text-gray-600 mt-2">
          Team: <span className="text-blue-600">{playerHistory.team_name}</span>
        </p>
        <p className="text-xl font-bold text-red-500 mt-4">
          Total Points: {playerHistory.player_total_points}
        </p>
      </div>

      {/* Table for Sports & Competitions */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border-collapse border border-gray-300">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-800 text-white text-left">
              <th className="px-4 py-3 border border-gray-600">Sport</th>
              <th className="px-4 py-3 border border-gray-600">Category</th>
              <th className="px-4 py-3 border border-gray-600">Competition Level</th>
              <th className="px-4 py-3 border border-gray-600">Points</th>
              <th className="px-4 py-3 border border-gray-600">Category Total Points</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {Object.entries(playerHistory.player_points).map(([sport, details]) =>
              Object.entries(details.categories).map(([category, catDetails]) => (
                <tr key={`${sport}-${category}`} className="border border-gray-300 odd:bg-gray-100 hover:bg-blue-50">
                  <td className="px-4 py-3 border border-gray-300">{sport}</td>
                  <td className="px-4 py-3 border border-gray-300 capitalize">{category.replace("_", " ")}</td>
                  <td className="px-4 py-3 border border-gray-300">
                    {catDetails.competitions.map((comp) => comp.competition_level).join(", ")}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 font-semibold">
                    {catDetails.competitions.map((comp) => comp.points).join(", ")}
                  </td>
                  <td className="px-4 py-3 border border-gray-300 font-bold text-blue-600">
                    {catDetails.category_total_points}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition-all"
        >
          Back
        </button>
      </div>
    </div>
  );
}

PlayerDetails.propTypes = {
  playerId: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default PlayerDetails;
