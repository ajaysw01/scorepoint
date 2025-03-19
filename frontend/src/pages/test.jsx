import { useEffect, useState } from "react";

const PlayerStats = ({ playerId }) => {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await fetch(
          `http://18.201.173.70/api/points/player/sport/${playerId}`
        );
        const data = await response.json();
        setPlayerData(data);
      } catch (error) {
        console.error("Error fetching player data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerStats();
  }, [playerId]);

  if (loading) return <p>Loading...</p>;
  if (!playerData) return <p>No data available</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800">
        {playerData.player_name}
      </h2>
      <p className="text-lg text-gray-600">Team: {playerData.team_name}</p>

      <h3 className="mt-4 text-xl font-semibold">Points Summary</h3>
      <table className="w-full mt-2 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Sport</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Points</th>
            <th className="border border-gray-300 px-4 py-2">Matches Played</th>
          </tr>
        </thead>
        <tbody>
          {playerData.points.map((point, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">
                {point.sport}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {point.category}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {point.points}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {point.matches_played}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerStats;
