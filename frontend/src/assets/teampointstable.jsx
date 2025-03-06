const TeamPointsTable = ({ data }) => {
    return (
        <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                <thead className="bg-green-600 text-white">
                    <tr>
                        <th className="p-3 text-left">Team</th>
                        <th className="p-3 text-left">Matches Won</th>
                        <th className="p-3 text-left">Total Points</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((team) => (
                        <tr key={team.name} className="border-b hover:bg-gray-100 transition">
                            <td className="p-3">{team.name}</td>
                            <td className="p-3">{team.wins}</td>
                            <td className="p-3">{team.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default TeamPointsTable;
