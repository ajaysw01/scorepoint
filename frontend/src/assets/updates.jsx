import { useState, useEffect } from "react";
import { format, isToday, isYesterday, isThisWeek, addDays } from "date-fns";

const mockMatches = [
    { id: 1, sport: "Cricket", category: "League", date: new Date(), team1: "Team A", team2: "Team B", venue: "Stadium 1" },
    { id: 2, sport: "Badminton", category: "Singles", date: addDays(new Date(), -1), team1: "Player X", team2: "Player Y", venue: "Court 2", result: "Player X won" },
    { id: 3, sport: "Table Tennis", category: "Doubles", date: addDays(new Date(), 3), team1: "Duo 1", team2: "Duo 2", venue: "Hall 3" },
    { id: 4, sport: "Carrom", category: "Knockout", date: addDays(new Date(), -1), team1: "Player A", team2: "Player B", venue: "Room 5", result: "Player B won" },
    { id: 5, sport: "Darts", category: "Finals", date: addDays(new Date(), 5), team1: "Shooter 1", team2: "Shooter 2", venue: "Lounge 4" },
];

const Updates = () => {
    const [matches, setMatches] = useState([]);
    const [filter, setFilter] = useState("live");

    useEffect(() => {
        // Using mock data instead of API
        setMatches(mockMatches);
    }, []);

    // Categorize matches
    const todayMatches = matches.filter(match => isToday(new Date(match.date)));
    const yesterdayMatches = matches.filter(match => isYesterday(new Date(match.date)));
    const upcomingMatches = matches.filter(match => isThisWeek(new Date(match.date)) && !isToday(new Date(match.date)));

    let filteredMatches;
    if (filter === "live") filteredMatches = todayMatches;
    else if (filter === "completed") filteredMatches = yesterdayMatches;
    else filteredMatches = upcomingMatches;

    return (
        <div className="container mx-auto mt-8 p-4">
            <h1 className="text-4xl font-bold text-center text-gray-800">Updates</h1>
            <div className="flex justify-center space-x-4 mt-6">
                <button onClick={() => setFilter("completed")} className={`px-6 py-2 font-medium rounded-lg transition-all ${filter === "completed" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}>Completed</button>
                <button onClick={() => setFilter("live")} className={`px-6 py-2 font-medium rounded-lg transition-all ${filter === "live" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>Live</button>
                <button onClick={() => setFilter("upcoming")} className={`px-6 py-2 font-medium rounded-lg transition-all ${filter === "upcoming" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"}`}>Upcoming</button>
            </div>
            <div className="mt-8">
                {renderMatchSection(filteredMatches, filter)}
            </div>
        </div>
    );
};

const renderMatchSection = (matches, filter) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.length > 0 ? (
            matches.map(match => (
                <div key={match.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all border border-gray-200">
                    <div className="p-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-gray-900">{match.sport} - {match.category}</h3>
                            <span className="px-3 py-1 text-white text-sm font-medium rounded-full bg-gray-700">
                                {format(new Date(match.date), "PPP p")}
                            </span>
                        </div>
                        <p className="mt-2 text-gray-600 font-medium">{match.team1} vs {match.team2}</p>
                        <p className="text-sm text-gray-500">Venue: {match.venue}</p>
                        {filter === "completed" && match.result && (
                            <p className="mt-2 text-green-600 font-bold">Result: {match.result}</p>
                        )}
                    </div>
                </div>
            ))
        ) : (
            <p className="text-gray-500 text-center">No matches available.</p>
        )}
    </div>
);

export default Updates;
