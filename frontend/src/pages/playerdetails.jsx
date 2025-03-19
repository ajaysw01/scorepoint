import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
};

const PlayerDetails = ({ playerId, onBack }) => {
  const [playerHistory, setPlayerHistory] = useState(null);

  useEffect(() => {
    axios
      .get(`https://scorepoint.onrender.com/api/points/player/${playerId}/history`)
      .then((response) => setPlayerHistory(response.data))
      .catch((error) => console.error("Error fetching player history:", error));
  }, [playerId]);

  if (!playerHistory) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center text-lg font-semibold"
      >
        Loading...
      </motion.p>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="max-w-lg mx-auto"
    >
      {/* Player Card */}
      <motion.div
        variants={cardVariants}
        className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition hover:shadow-xl"
      >
        {/* Player Header */}
        <div className="text-center mb-6">
          <motion.h2
            className="text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {playerHistory.player_name}
          </motion.h2>
          <p className="text-sm text-gray-500">{playerHistory.team_name}</p>
          <motion.p
            className="mt-2 text-lg font-semibold text-red-500"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            Total Points: {playerHistory.player_total_points}
          </motion.p>
        </div>

        {/* Points Table */}
        <motion.div className="overflow-x-auto transition-transform duration-500 ease-in-out">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-red-500 to-red-700 text-white">
                <th className="px-3 py-2 text-left border border-gray-300">Sport</th>
                <th className="px-3 py-2 text-left border border-gray-300">Category</th>
                <th className="px-3 py-2 text-left border border-gray-300">Level</th>
                <th className="px-3 py-2 text-left border border-gray-300">Points</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(playerHistory.player_points).map(([sport, details]) =>
                Object.entries(details.categories).map(([category, catDetails]) =>
                  catDetails.competitions.map((comp, idx) => (
                    <motion.tr
                      key={`${sport}-${category}-${idx}`}
                      whileHover={{ scale: 1.02 }}
                      className="odd:bg-gray-50 even:bg-white hover:bg-red-50 transition"
                    >
                      <td className="px-3 py-2 border border-gray-300">{sport}</td>
                      <td className="px-3 py-2 border border-gray-300 capitalize">
                        {category.replace("_", " ")}
                      </td>
                      <td className="px-3 py-2 border border-gray-300">{comp.competition_level}</td>
                      <td className="px-3 py-2 border border-gray-300 font-semibold text-blue-600">
                        {comp.points}
                      </td>
                    </motion.tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </motion.div>
      </motion.div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 flex justify-center"
      >
        <button
          onClick={onBack}
          className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-700 transition cursor-pointer"
        >
          Back
        </button>
      </motion.div>
    </motion.div>
  );
};

PlayerDetails.propTypes = {
  playerId: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default PlayerDetails;
