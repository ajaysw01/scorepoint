import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function TeamDetails() {
  const navigate = useNavigate();
  const { team_id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    axios
      .get(`http://18.201.173.70/api/teams/${team_id}`)
      .then((response) => {
        setTeam(response.data);
      })
      .catch((error) => console.error("Error fetching team details:", error));
  }, [team_id]);
  

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
        {team.name}
      </h2>

      <div className="relative p-4">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-85"
          style={{ backgroundImage: `url(${team.logo})` }}
        />

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
          {team.players?.map((member) => (
            <div
              key={member.id}
              onClick={() => navigate(`/teams/${team_id}/${member.id}/history`)} // Navigate to player history with teamId and playerId
              className="bg-gray-200 text-gray-800 px-6 py-4 rounded-md shadow-md text-center font-medium hover:bg-blue-100 cursor-pointer transition duration-200"
            >
              {member.name}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/teams")}
          className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition-all cursor-pointer"
        >
          Back to Teams
        </button>
      </div>
    </div>
  );
}

TeamDetails.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    players: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
};
