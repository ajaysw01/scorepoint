import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const PlayerRankings = () => {
  const [rankings, setRankings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://sports-backend.apps-dev.creditsafe.com/api/points/player/rankings")
      .then((response) => {
        setRankings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching rankings:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin w-12 h-12 text-gray-600" />
      </div>
    );
  }

  if (!rankings || Object.keys(rankings).length === 0) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Player Rankings
        </h1>
        <p className="text-gray-600 text-center text-xl font-semibold">
          No player rankings available.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Player Rankings</h1>

      {Object.entries(rankings).map(([sport, categories]) => (
        <div key={sport} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 capitalize mb-4">
            {sport}
          </h2>

          {Object.entries(categories).map(([category, { playerData }]) => (
            <div
              key={category}
              className="mb-6 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="p-4 border-b">
                <h3 className="text-lg font-medium text-gray-700 capitalize">
                  {category.replace("_", " ")}
                </h3>
              </div>

              {playerData && playerData.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-800 text-white text-left">
                        <th className="px-4 py-3 border border-gray-600">
                          Rank
                        </th>
                        <th className="px-4 py-3 border border-gray-600">
                          Name
                        </th>
                        <th className="px-4 py-3 border border-gray-600">
                          Team
                        </th>
                        <th className="px-4 py-3 border border-gray-600">
                          Matches Played
                        </th>
                        <th className="px-4 py-3 border border-gray-600">
                          Points
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {playerData
                        .sort((a, b) => b.points - a.points)
                        .map((player, index) => (
                          <tr
                            key={player.name}
                            className="border border-gray-300 odd:bg-gray-100 hover:bg-blue-50"
                          >
                            <td className="px-4 py-3 border border-gray-300 text-center">
                              {index + 1}
                            </td>
                            <td className="px-4 py-3 border border-gray-300">
                              {player.name}
                            </td>
                            <td className="px-4 py-3 border border-gray-300">
                              {player.team}
                            </td>
                            <td className="px-4 py-3 border border-gray-300 text-center">
                              {player.matches_played}
                            </td>
                            <td className="px-4 py-3 border border-gray-300 font-bold text-blue-600 text-center">
                              {player.points}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No player ranking available for this category.
                </p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlayerRankings;
