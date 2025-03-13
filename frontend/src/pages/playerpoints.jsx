const PlayerPointsTable = ({ data }) => {
    return (
      <div className="overflow-hidden rounded-xl shadow-lg bg-white">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-blue-600 text-white text-lg">
            <tr>
              <th className="p-4 text-left">Player</th>
              <th className="p-4 text-left">Team</th>
              <th className="p-4 text-left">Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((player) => (
              <tr key={player.player_id} className="border-b hover:bg-gray-100 transition-all">
                <td className="p-4 font-semibold text-gray-900">{player.name}</td>
                <td className="p-4 font-semibold text-gray-600">{player.team_name}</td>
                <td className="p-4 font-semibold text-blue-700">{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default PlayerPointsTable;
  