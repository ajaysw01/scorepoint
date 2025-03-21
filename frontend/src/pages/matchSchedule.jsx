import { useEffect, useState } from "react";
import {
  format,
  isToday,
  isFuture,
  isPast,
  isBefore,
  startOfDay,
  endOfDay,
} from "date-fns";

const MatchScheduleCard = ({ sport, category }) => {
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState("live");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          `http://18.201.173.70/api/match/${sport}/${category}`
        );

        if (response.status === 404) {
          console.warn("No updates available for this sport and category.");
          setMatches([]);
          return;
        }

        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching match schedules:", error);
        setMatches([]);
      }
    };

    fetchMatches();
  }, [sport, category]);

  // ✅ Filter Matches based on "live", "completed", and "upcoming"
  const filterMatches = (matchList) => {
    const now = new Date();

    if (!matchList || matchList.length === 0) return [];

    return matchList.filter((match) => {
      const matchDate = new Date(match.date);

      if (filter === "live") return isToday(matchDate);
      if (filter === "completed")
        return isPast(matchDate) && !isToday(matchDate);
      if (filter === "upcoming") return isFuture(matchDate);

      return true;
    });
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      {/* Filter Buttons */}
      <div className="flex justify-center space-x-2 mb-6">
        {["completed", "live", "upcoming"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
              filter === f
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* No Updates Available */}
      {matches.length === 0 && (
        <p className="text-gray-500 text-center text-xl font-semibold mb-6">
          No updates available.
        </p>
      )}

      {/* Match Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterMatches(matches).length > 0 ? (
          filterMatches(matches).map((match, index) => (
            <MatchCard key={index} match={match} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">
            No matches available.
          </p>
        )}
      </div>
    </div>
  );
};

const MatchCard = ({ match }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all border border-gray-300 p-5">
    {/* Date */}
    <div className="w-full text-center bg-gray-900 text-white rounded-md py-2 text-sm font-semibold tracking-wide">
      {format(new Date(match.date), "EEEE, dd MMM yyyy, hh:mm a")}
    </div>

    {/* Match Info */}
    <div className="mt-4 text-center">
      <h3 className="text-xl font-bold text-gray-900">
        {match.team1} vs {match.team2}
      </h3>
      <p className="text-gray-600 text-sm mt-1">{match.category}</p>
    </div>

    {/* Player Matchup */}
    <div className="mt-2 text-center bg-gray-100 px-3 py-1 rounded-md text-sm font-medium text-gray-700">
      {match.player1} vs {match.player2}
    </div>

    {/* Venue */}
    <div className="mt-3 text-gray-700 text-sm font-medium">
      <span className="font-semibold">Venue:</span> {match.venue}
    </div>

    {/* Time */}
    <div className="mt-1 text-gray-700 text-sm font-medium">
      <span className="font-semibold">Time:</span> {match.time}
    </div>

    {/* Comments */}
    {match.comments && (
      <div className="mt-2 text-gray-600 text-xs italic border-t pt-2">
        {match.comments}
      </div>
    )}
  </div>
);

export default MatchScheduleCard;
