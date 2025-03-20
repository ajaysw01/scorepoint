import { useEffect, useState } from "react";

const MatchScheduleCard = ({ sport, category }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`https://scorepoint.onrender.com/api/match/batch/schedules`);
        const data = await response.json();

        const now = new Date();
        now.setHours(0, 0, 0, 0); // Reset to start of the day

        const oneWeekLater = new Date();
        oneWeekLater.setDate(now.getDate() + 7);

        const filteredMatches = data.filter((match) => {
          const matchDate = new Date(match.date);
          matchDate.setHours(0, 0, 0, 0); // Ensure we compare only date parts

          return match.sport === sport && match.category === category;
        });

        setMatches(filteredMatches);
      } catch (error) {
        console.error("Error fetching match schedules:", error);
      }
    };

    fetchMatches();
  }, [sport, category]);

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const oneWeekLater = new Date();
  oneWeekLater.setDate(now.getDate() + 7);

  const todayMatches = matches.filter(
    (match) => new Date(match.date).toDateString() === now.toDateString()
  );

  const upcomingMatches = matches.filter(
    (match) => {
      const matchDate = new Date(match.date);
      return matchDate > now && matchDate <= oneWeekLater;
    }
  );

  return (
    <div className="space-y-6">
      {/* Today's Matches */}
      {todayMatches.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Today's Matches
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todayMatches.map((match) => (
              <div key={match._id} className="p-4 border rounded-lg shadow-md bg-white">
                <h3 className="text-lg font-bold">{match.team1} vs {match.team2}</h3>
                <p className="text-gray-600">{match.category}</p>
                <p className="text-gray-500">{match.date} | {match.time}</p>
                <p className="text-gray-700">{match.venue}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Matches */}
      {upcomingMatches.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Upcoming Matches (Next 7 Days)
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingMatches.map((match) => (
              <div key={match._id} className="p-4 border rounded-lg shadow-md bg-white">
                <h3 className="text-lg font-bold">{match.team1} vs {match.team2}</h3>
                <p className="text-gray-600">{match.category}</p>
                <p className="text-gray-500">{match.date} | {match.time}</p>
                <p className="text-gray-700">{match.venue}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Matches Found */}
      {todayMatches.length === 0 && upcomingMatches.length === 0 && (
        <p className="text-center text-gray-600">No matches available.</p>
      )}
    </div>
  );
};

export default MatchScheduleCard;
