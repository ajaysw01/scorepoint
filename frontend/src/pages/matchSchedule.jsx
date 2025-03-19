import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Flag } from "lucide-react";

const MatchScheduleCard = ({ sport, category }) => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        // Fetch match schedules dynamically based on sport and category
        const fetchMatches = async () => {
            try {
                const response = await fetch(
                    `https://scorepoint.onrender.com/api/schedules?sport=${sport}&category=${category}`
                );
                const data = await response.json();
                setMatches(data);
            } catch (error) {
                console.error("Error fetching match schedules:", error);
            }
        };

        fetchMatches();
    }, [sport, category]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                {sport} - {category} Matches
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.length > 0 ? (
                    matches.map((match) => (
                        <div key={match.id} className="bg-white shadow-lg rounded-xl p-4 border border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm">{match.status}</span>
                                <Flag className="w-5 h-5 text-gray-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mt-2">
                                {match.team1} vs {match.team2}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                🎾 {match.player1_team1} vs {match.player2_team2}
                            </p>
                            <div className="flex items-center text-gray-700 text-sm mt-3">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{match.day}, {match.date}</span>
                            </div>
                            <div className="flex items-center text-gray-700 text-sm mt-1">
                                <Clock className="w-4 h-4 mr-2" />
                                <span>{match.time}</span>
                            </div>
                            <div className="flex items-center text-gray-700 text-sm mt-1">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>{match.venue}</span>
                            </div>
                            {match.comments && (
                                <p className="text-gray-500 text-xs mt-2">💬 {match.comments}</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No matches scheduled.</p>
                )}
            </div>
        </div>
    );
};

export default MatchScheduleCard;
