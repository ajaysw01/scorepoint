const PlayerPointsTable = ({ data }) => {
    return (
        <div className="overflow-hidden rounded-xl shadow-lg bg-white">
            <table className="min-w-full bg-white border-collapse">
                <thead className="bg-blue-600 text-white text-lg">
                    <tr>
                        <th className="p-4 text-left">Rank</th>
                        <th className="p-4 text-left">Player</th>
                        <th className="p-4 text-left">Team</th>
                        <th className="p-4 text-left">Level</th>
                        <th className="p-4 text-left">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((player, index) => (
                        <tr
                            key={player.name}
                            className="border-b hover:bg-gray-100 transition-all"
                        >
                            <td className="p-4 font-semibold text-gray-700">{index + 1}</td>
                            <td className="p-4 font-semibold text-gray-900">{player.name}</td>
                            <td className="p-4 font-semibold text-gray-600">{player.team}</td>
                            <td className="p-4 font-semibold text-blue-500">Level {player.level}</td>
                            <td className="p-4 font-semibold text-blue-700">{player.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlayerPointsTable;
