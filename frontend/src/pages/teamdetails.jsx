import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

export default function TeamDetails() {
  const navigate = useNavigate();
  const { team_id } = useParams();
  const location = useLocation();
  const [team, setTeam] = useState(null);

  // Grab the logo from the location state
  const logo = location.state?.logo;

  useEffect(() => {
    axios
      .get(`https://sports-backend.apps-dev.creditsafe.com/api/teams/${team_id}`)
      .then((response) => setTeam(response.data))
      .catch((error) => console.error("Error fetching team details:", error));
  }, [team_id]);

  if (!team) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      {/* Team Name */}
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
        {team.name}
      </h2>

      {/* Team Members Section with Background Logo */}
      <div className="relative p-4">
        {/* Background Logo */}
        {logo && (
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-80"
            style={{ backgroundImage: `url(${logo})` }}
          ></div>
        )}

        {/* Members List */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
          {team.players?.map((member) => (
            <div
              key={member.id}
              // Pass the logo when navigating to PlayerDetails
              onClick={() =>
                navigate(`/teams/${team_id}/${member.id}/history`, {
                  state: { logo },
                })
              }
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
    players: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
};
