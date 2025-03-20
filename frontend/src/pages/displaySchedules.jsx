import React from "react";

const ScheduleTree = () => {
  // Sample match schedule with winners advancing
  const scheduleData = {
    "Round 1": [
      { id: 1, player1: "John", player2: "Mike", team1: "Team A", team2: "Team B", winner: "Team A" },
      { id: 2, player1: "Alex", player2: "James", team1: "Team C", team2: "Team D", winner: "Team C" },
    ],
    "Round 2": [
      { id: 3, player1: "John", player2: "Alex", team1: "Team A", team2: "Team C", winner: "Team A" },
    ],
    "Finals": [
      { id: 4, player1: "John", player2: "Ethan", team1: "Team A", team2: "Team E", winner: "TBD" },
    ],
  };

  return (
    <div className="flex gap-8 p-6 overflow-auto">
      {Object.keys(scheduleData).map((round, roundIndex) => (
        <div key={roundIndex} className="flex flex-col items-center">
          <h2 className="text-lg font-bold bg-blue-500 text-white px-4 py-2 rounded-lg">{round}</h2>
          <div className="mt-4 flex flex-col gap-6 relative">
            {scheduleData[round].map((match, matchIndex) => (
              <MatchCard
                key={match.id}
                match={match}
                roundIndex={roundIndex}
                matchIndex={matchIndex}
                totalMatches={scheduleData[round].length}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Match Card with winner display
const MatchCard = ({ match, roundIndex, matchIndex, totalMatches }) => {
  return (
    <div className="relative bg-white border shadow-md rounded-lg p-4 w-48 text-center">
      <h3 className="font-semibold">{match.team1} vs {match.team2}</h3>
      <p className="text-sm text-gray-600">{match.player1} vs {match.player2}</p>
      <p className="mt-2 font-bold text-green-600">Winner: {match.winner}</p>

      {/* SVG Connector Lines */}
      {roundIndex < 2 && ( // Only draw lines for first 2 rounds
        <svg
          className="absolute right-[-30px] top-1/2 transform translate-x-1/2 -translate-y-1/2"
          width="40"
          height="40"
          viewBox="0 0 40 40"
        >
          <line
            x1="0"
            y1="20"
            x2="30"
            y2={totalMatches > 1 && matchIndex % 2 === 0 ? "10" : "30"}
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      )}
    </div>
  );
};

export default ScheduleTree;
