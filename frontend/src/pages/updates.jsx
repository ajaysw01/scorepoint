import { useState, useEffect } from "react";
import { format, isToday, isFuture, isPast } from "date-fns";

// Updated Cricket Schedules
const cricketSchedules = [
  { id: 1, sport: "Cricket", category: "League Matches", date: new Date("2025-03-22T07:30:00"), team1: "The Giants", team2: "Hogwarts Heros", venue: "AM Cricket Ground powered by ProsficArena, Hyderabad" },
  { id: 2, sport: "Cricket", category: "League Matches", date: new Date("2025-03-22T09:30:00"), team1: "Ravenclaws", team2: "Order Of the Phoenix", venue: "AM Cricket Ground powered by ProsficArena, Hyderabad" },
  { id: 3, sport: "Cricket", category: "League Matches", date: new Date("2025-03-22T13:00:00"), team1: "Hogwarts Heros", team2: "Order Of the Phoenix", venue: "AM Cricket Ground powered by ProsficArena, Hyderabad" },
  { id: 4, sport: "Cricket", category: "League Matches", date: new Date("2025-03-22T15:00:00"), team1: "The Giants", team2: "Ravenclaws", venue: "AM Cricket Ground powered by ProsficArena, Hyderabad" },
  { id: 5, sport: "Cricket", category: "League Matches", date: new Date("2025-03-23T07:30:00"), team1: "Gryffindors", team2: "The Goblins", venue: "AM Cricket Ground powered by ProsficArena, Hyderabad" },
  { id: 6, sport: "Cricket", category: "League Matches", date: new Date("2025-03-23T09:30:00"), team1: "The Dragons", team2: "Dark Wizards", venue: "AM Cricket Ground powered by ProsficArena, Hyderabad" },
  { id: 7, sport: "Cricket", category: "League Matches", date: new Date("2025-03-23T13:00:00"), team1: "The Dragons", team2: "The Goblins", venue: "AM Cricket Ground powered by ProsficArena, Hyderabad" },
  { id: 8, sport: "Cricket", category: "League Matches", date: new Date("2025-03-23T15:00:00"), team1: "Gryffindors", team2: "Dark Wizards", venue: "AM Cricket Ground powered by ProsficArena, Hyderabad" },
];

const Updates = () => {
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState("live");

  useEffect(() => {
    setMatches(cricketSchedules);
  }, []);

  // Categorize matches
  const todayMatches = matches.filter((match) => isToday(new Date(match.date)));
  const completedMatches = matches.filter((match) => isPast(new Date(match.date)) && !isToday(new Date(match.date)));
  const upcomingMatches = matches.filter((match) => isFuture(new Date(match.date)));

  let filteredMatches;
  if (filter === "live") filteredMatches = todayMatches;
  else if (filter === "completed") filteredMatches = completedMatches;
  else filteredMatches = upcomingMatches;

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800">Cricket Match Updates</h1>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        {["completed", "live", "upcoming"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 font-medium rounded-lg transition-all ${
              filter === f ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Match Cards */}
      <div className="mt-8">{renderMatchSection(filteredMatches)}</div>
    </div>
  );
};

// Render Matches Section
const renderMatchSection = (matches) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {matches.length > 0 ? (
      matches.map((match) => (
        <div
          key={match.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all border border-gray-200"
        >
          <div className="p-4 flex flex-col items-center justify-between space-y-4 h-full">
            {/* Date Section with Fixed Height */}
            <div className="w-full flex justify-center items-center bg-black text-white rounded-lg py-2">
              <span className="text-lg font-medium">
                {format(new Date(match.date), "EEEE, dd MMM yyyy, hh:mm a")}
              </span>
            </div>

            {/* Match Info */}
            <h3 className="text-xl font-semibold text-gray-900 text-center">
              {match.team1} vs {match.team2}
            </h3>
            <p className="text-gray-600">{match.sport} - {match.category}</p>
            <p className="text-sm text-gray-500">{match.venue}</p>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-center">No matches available.</p>
    )}
  </div>
);

export default Updates;
