import React, { useEffect, useState } from "react";
import axios from "axios";

const categoryOptions = [
  { label: "Mens Singles", value: "men_singles" },
  { label: "Womens Singles", value: "women_singles" },
  { label: "Mens Doubles", value: "men_doubles" },
  { label: "Womens Doubles", value: "women_doubles" },
  { label: "Mixed Doubles", value: "mixed_doubles" }
];

const sportsWithCategories = ["Badminton", "Table Tennis", "Carroms"];

const PointsDialog = ({ isOpen, onClose, sport, sportId }) => {
  const [category, setCategory] = useState("");
  const [playerPoints, setPlayerPoints] = useState([]);

  const fetchPoints = async (sportId, categori) => {
    try {
      let categoryNum = sportsWithCategories.includes(sport) ? categori : none;
      let url = `https://scorepoint.onrender.com/api/points/players?sport_id=${sportId}&category=${categoryNum}`;
      const response = await axios.get(url);
      setPlayerPoints(response.data);
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };

  useEffect(() => {
    if (!sportsWithCategories.includes(sport)) {
      fetchPoints(sportId, null);
    }
  }, [sport, sportId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-bold mb-4">{sport} Points</h3>
        {sportsWithCategories.includes(sport) && (
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="border p-2 w-full"
          >
            <option value="">-- Select Category --</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        )}
        <div className="mt-4 flex justify-end gap-2">
          {sportsWithCategories.includes(sport) && (
            <button onClick={() => fetchPoints(sportId, category)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Fetch</button>
          )}
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-md">Close</button>
        </div>
        {playerPoints.length > 0 && (
          <ul className="mt-4 border p-2 max-h-40 overflow-auto">
            {playerPoints.map((player) => (
              <li key={player.id} className="border-b py-2">{player.name} - {player.points} Points</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const EditScores = () => {
  const [sports, setSports] = useState([]);
  const [editDialog, setEditDialog] = useState({ isOpen: false, sport: null });
  const [pointsDialog, setPointsDialog] = useState({ isOpen: false, sport: "", sportId: null, category: null });

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const response = await axios.get("https://scorepoint.onrender.com/api/sports");
      setSports(response.data);
    } catch (error) {
      console.error("Error fetching sports:", error);
    }
  };

  const handleDelete = async (sportId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`https://scorepoint.onrender.com/api/sports/${sportId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSports();
    } catch (error) {
      console.error("Error deleting sport:", error);
    }
  };

  return (
    <div className="p-6 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Sports Management</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sports.map((sport) => {
          let timer;
          return (
            <div
              key={sport.id}
              className="bg-blue-100 hover:bg-blue-200 p-4 rounded-lg shadow-md text-center relative"
              onClick={() => setPointsDialog({ isOpen: true, sport: sport.name, sportId: sport.id })}
              onMouseDown={() => {
                timer = setTimeout(() => {
                  setEditDialog({ isOpen: true, sport });
                }, 600);
              }}
              onMouseUp={() => clearTimeout(timer)}
              onMouseLeave={() => clearTimeout(timer)}
            >
              <h3 className="text-xl font-semibold mb-2">{sport.name}</h3>
            </div>
          );
        })}
      </div>
      {editDialog.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Edit/Delete Sport</h3>
            <div className="flex justify-between">
              <button onClick={() => handleDelete(editDialog.sport.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
              <button onClick={() => console.log("Edit") } className="bg-yellow-500 text-white px-4 py-2 rounded-md">Edit</button>
            </div>
            <button onClick={() => setEditDialog({ isOpen: false, sport: null })} className="bg-gray-400 text-white px-4 py-2 rounded-md mt-4">Close</button>
          </div>
        </div>
      )}
      <PointsDialog isOpen={pointsDialog.isOpen} onClose={() => setPointsDialog({ isOpen: false, sport: "", sportId: null, category: null })} sport={pointsDialog.sport} sportId={pointsDialog.sportId} />
    </div>
  );
};

export default EditScores;
