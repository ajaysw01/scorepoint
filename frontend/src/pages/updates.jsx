import { useState, useEffect } from "react";
import { format, isToday, isFuture, isPast } from "date-fns";

// Grouped Sports Schedules
const sportsData = {
  Cricket: {
    "Group A": [
      { id: 1, category: "League Matches", date: "2025-03-22T07:30:00", team1: "The Giants", team2: "Hogwarts Heros", venue: "AM Cricket Ground powered by ProsficArena, Hyderabad" },
      { id: 2, category: "League Matches", date: "2025-03-22T09:30:00", team1: "Ravenclaws", team2: "Order Of the Phoenix", venue: "AM Cricket Ground powered by ProsficArena, Hyderabad" },
      { id: 3, category: "League Matches", date: "2025-03-22T13:00:00", team1: "Hogwarts Heros", team2: "Order Of the Phoenix", venue: "AM Cricket Ground powered by ProsficArena, Hyderabad" },
      { id: 4, category: "League Matches", date: "2025-03-22T15:00:00", team1: "The Giants", team2: "Ravenclaws", venue: "AM Cricket Ground powered by ProsficArena, Hyderabad" },
    ],
    "Group B": [
      { id: 5, category: "League Matches", date: "2025-03-23T07:30:00", team1: "Gryffindors", team2: "The Goblins", venue: "AM Cricket Ground powered by ProsficArena, Hyderabad" },
      { id: 6, category: "League Matches", date: "2025-03-23T09:30:00", team1: "The Dragons", team2: "Dark Wizards", venue: "AM Cricket Ground powered by ProsficArena, Hyderabad" },
      { id: 7, category: "League Matches", date: "2025-03-23T13:00:00", team1: "The Dragons", team2: "The Goblins", venue: "AM Cricket Ground powered by ProsficArena, Hyderabad" },
      { id: 8, category: "League Matches", date: "2025-03-23T15:00:00", team1: "Gryffindors", team2: "Dark Wizards", venue: "AM Cricket Ground powered by ProsficArena, Hyderabad" },
    ],
  },
  Badminton: [
    { id: 9, category: "Quarter Finals", date: "2025-03-20T10:00:00", team1: "Shuttle Smashers", team2: "Birdie Blasters", venue: "Indoor Stadium, Hyderabad" },
  ],
  TableTennis: [
    { id: 10, category: "Final", date: "2025-03-23T15:00:00", team1: "Spin Masters", team2: "Ping Pong Pros", venue: "Table Tennis Arena, Hyderabad" },
  ],
  Carroms: [
    { id: 11, category: "Semi Finals", date: "2025-03-21T11:00:00", team1: "Queen Crushers", team2: "Striker Kings", venue: "Recreation Room, Hyderabad" },
  ],
  Darts: [
    { id: 12, category: "Final", date: "2025-03-25T14:00:00", team1: "Bullseye Warriors", team2: "Sharp Shooters", venue: "Darts Arena, Hyderabad" },
  ],
};

const Updates = () => {
  const [currentSport, setCurrentSport] = useState("Cricket");
  const [filter, setFilter] = useState("live");
  const [matches, setMatches] = useState({});

  // Update matches when sport changes
  useEffect(() => {
    setMatches(sportsData[currentSport] || {});
  }, [currentSport]);

  const filterMatches = (matchList) => {
    if (!Array.isArray(matchList)) return [];
    const todayMatches = matchList.filter((match) => isToday(new Date(match.date)));
    const completedMatches = matchList.filter((match) => isPast(new Date(match.date)) && !isToday(new Date(match.date)));
    const upcomingMatches = matchList.filter((match) => isFuture(new Date(match.date)));

    if (filter === "live") return todayMatches;
    if (filter === "completed") return completedMatches;
    return upcomingMatches;
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Match Updates</h1>

      {/* Sport Selection - Responsive Scrollable Buttons */}
      {/* Sport Selection - Centered & Scrollable */}
<div className="flex justify-center">
  <div className="flex overflow-x-auto space-x-2 mb-6 px-2">
    {Object.keys(sportsData).map((sport) => (
      <button
        key={sport}
        onClick={() => setCurrentSport(sport)}
        className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-all ${
          currentSport === sport ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        {sport}
      </button>
    ))}
  </div>
</div>


      {/* Filter Buttons */}
      <div className="flex justify-center space-x-2 mb-6">
        {["completed", "live", "upcoming"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              filter === f ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Match Cards */}
      {currentSport === "Cricket" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Group A */}
          <div>
            <h2 className="text-2xl font-bold text-center text-black mb-4">Group A</h2>
            {renderMatchSection(filterMatches(matches["Group A"]))}
          </div>

          {/* Group B */}
          <div>
            <h2 className="text-2xl font-bold text-center text-black mb-4">Group B</h2>
            {renderMatchSection(filterMatches(matches["Group B"]))}
          </div>
        </div>
      ) : (
        renderCompactMatchSection(filterMatches(matches))
      )}
    </div>
  );
};

// 🏏 Render Cricket Matches
const renderMatchSection = (matches) => (
  <div className="grid grid-cols-1 gap-6">
    {matches.length > 0 ? (
      matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))
    ) : (
      <p className="text-gray-500 text-center col-span-3">No matches available.</p>
    )}
  </div>
);

// 🏅 Render Compact Matches (Other Sports)
const renderCompactMatchSection = (matches) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {matches.length > 0 ? (
      matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))
    ) : (
      <p className="text-gray-500 text-center col-span-3">No matches available.</p>
    )}
  </div>
);

// 📦 Match Card Component
const MatchCard = ({ match }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all border border-gray-200">
    <div className="p-4 flex flex-col items-center justify-between space-y-4 h-full">
      {/* Date */}
      <div className="w-full flex justify-center items-center bg-black text-white rounded-lg py-2">
        <span className="text-lg font-medium">{format(new Date(match.date), "EEEE, dd MMM yyyy, hh:mm a")}</span>
      </div>

      {/* Match Info */}
      <h3 className="text-xl font-semibold text-gray-900 text-center">
        {match.team1} vs {match.team2}
      </h3>
      <p className="text-gray-600 text-lg">{match.category}</p>
      <p className="text-sm text-gray-500">{match.venue}</p>
    </div>
  </div>
);

export default Updates;
