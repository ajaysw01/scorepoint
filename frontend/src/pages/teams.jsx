import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

export default function Teams() {
  const [teams, setTeams] = useState([
    {
      name: "Order of the Phoenix",
      logo: "/assets/images/order.png",
      members: [],
    },
    {
      name: "Hogwarts Heroes",
      logo: "/assets/images/Hogwarts.png",
      members: [],
    },
    {
      name: "The Goblins",
      logo: "/assets/images/goblins.png",
      members: [],
    },
    {
      name: "Gryffindors",
      logo: "/assets/images/gry.png",
      members: [],
    },
    {
      name: "Ravenclaws",
      logo: "/assets/images/ravenclaw.png",
      members: [],
    },
    {
      name: "Dark Wizards",
      logo: "/assets/images/Death.png",
      members: [],
    },
    {
      name: "The Giants",
      logo: "/assets/images/giants_logo.png",
      members: [],
    },
    {
      name: "The Dragons",
      logo: "/assets/images/dragon.png",
      members: [],
    },
  ]);

  useEffect(() => {
    axios
      .get("https://sports-backend.apps-dev.creditsafe.com/api/teams")
      .then((response) => {
        setTeams((prevTeams) =>
          prevTeams.map((team) => {
            const fetchedTeam = response.data.find(
              (t) => t.name.toLowerCase() === team.name.toLowerCase()
            );
            return fetchedTeam
              ? {
                  ...team,
                  id: fetchedTeam.id,
                  total_points: fetchedTeam.total_points,
                  members: fetchedTeam.players.map((player) => ({
                    id: player.id,
                    name: player.name,
                    teamId: player.team_id,
                  })),
                }
              : team;
          })
        );
      })
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <TeamsList teams={teams} />
    </div>
  );
}

function TeamsList({ teams }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Teams
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 justify-items-center">
        {teams.map((team) => (
          <div
            key={team.id}
            // Pass the logo as part of the state
            onClick={() =>
              navigate(`/teams/${team.id}`, { state: { logo: team.logo } })
            }
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

TeamsList.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      members: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};
