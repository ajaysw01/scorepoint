const MatchHistory = ({ data }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {data.map((match) => (
                <div
                    key={match.matchId}
                    className="p-6 bg-white shadow-lg rounded-xl border-l-4 border-red-600 hover:shadow-xl transition-all"
                >
                    <h3 className="text-lg font-bold text-gray-900">{match.matchId}</h3>
                    <p className="text-gray-700 mt-2">
                        <span className="font-semibold text-red-600">Winner:</span> {match.winner}
                    </p>
                    <p className="text-gray-700 mt-1">
                        <span className="font-semibold">Opponents:</span> {match.opponents}
                    </p>
                    <p className="text-gray-700 mt-1">
                        <span className="font-semibold">Score:</span> {match.score}
                    </p>
                    <p className="text-gray-700 mt-1">
                        <span className="font-semibold">Date:</span> {match.date}
                    </p>
                    <p className="text-gray-700 mt-1">
                        <span className="font-semibold">Time:</span> {match.time}
                    </p>
                    <p className="text-gray-700 mt-1">
                        <span className="font-semibold">Venue:</span> {match.venue}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default MatchHistory;
