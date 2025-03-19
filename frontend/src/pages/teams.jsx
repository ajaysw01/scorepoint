import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import PlayerDetails from "./playerdetails";
export default function Teams() {
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Order of the Phoenix",
      logo: "static/images/order.png",
      members: [],
    },
    {
      id: 2,
      name: "Hogwarts Heroes",
      logo: "static/images/Hogwarts.png",
      members: [],
    },
    {
      id: 3,
      name: "The Goblins",
      logo: "static/images/goblins.png",
      members: [],
    },
    { id: 4, name: "Gryffindors", logo: "static/images/gry.png", members: [] },
    {
      id: 5,
      name: "Ravenclaws",
      logo: "static/images/ravenclaw.png",
      members: [],
    },
    {
      id: 6,
      name: "Dark Wizards",
      logo: "static/images/Death.png",
      members: [],
    },
    { id: 7, name: "The Giants", logo: "static/images/maru.png", members: [] },
    {
      id: 8,
      name: "The Dragons",
      logo: "static/images/dragon.png",
      members: [],
    },
  ]);

  useEffect(() => {
    axios
      .get("https://18.201.173.70/api/teams")
      .then((response) => {
        setTeams((prevTeams) =>
          prevTeams.map((team) => {
            const fetchedTeam = response.data.find(
              (t) => t.name.toLowerCase() === team.name.toLowerCase()
            );
            return fetchedTeam
              ? {
                  ...team,
                  members: fetchedTeam.players.map((player) => ({
                    id: player.id, // Include player ID
                    name: player.name,
                  })),
                }
              : team;
          })
        );
      })
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {selectedTeam ? (
        <TeamDetails team={selectedTeam} onBack={() => setSelectedTeam(null)} />
      ) : (
        <TeamsList teams={teams} onSelectTeam={setSelectedTeam} />
      )}
    </div>
  );
}

// ✅ Teams List Component
function TeamsList({ teams, onSelectTeam }) {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Teams
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 justify-items-center">
        {teams.map((team) => (
          <div
            key={team.id}
            onClick={() => onSelectTeam(team)}
            className="flex flex-col items-center cursor-pointer text-lg font-semibold hover:text-red-600"
          >
            <img
              src={team.logo}
              alt={team.name}
              className="w-32 h-32 md:w-40 md:h-40 object-contain transition-transform duration-200 ease-in-out hover:scale-110"
            />
            <p className="mt-2 text-lg md:text-xl font-bold">{team.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ✅ Team Details Component
// ✅ Team Details Component with Background Logo Effect
// ✅ Team Details Component with Background Logo Only
function TeamDetails({ team, onBack }) {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  if (selectedPlayerId) {
    return (
      <PlayerDetails
        playerId={selectedPlayerId}
        onBack={() => setSelectedPlayerId(null)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
        {team.name}
      </h2>

      {/* Members Section with Background Logo */}
      <div className="relative p-4">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-85"
          style={{ backgroundImage: `url(${team.logo})` }}
        />

        {/* Members List (Clickable) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
          {team.members.map((member, index) => (
            <div
              key={index}
              onClick={() => setSelectedPlayerId(member.id)} // Pass player ID
              className="bg-gray-200 text-gray-800 px-6 py-4 rounded-md shadow-md text-center font-medium hover:bg-blue-100 cursor-pointer transition duration-200"
            >
              {member.name}
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition-all cursor-pointer"
        >
          Back to Teams
        </button>
      </div>
    </div>
  );
}

// ✅ Prop Types
TeamsList.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      members: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  onSelectTeam: PropTypes.func.isRequired,
};

TeamDetails.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};
