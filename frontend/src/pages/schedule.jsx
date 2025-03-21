import AddScore from "../pages/addScore";
import ScheduleUpload from "../pages/addSchedules";
const Schedule = () => {
  return (
    <div className="flex flex-col h-screen p-4 gap-4">
      {/* Add Score Section */}
      <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md">
        <AddScore />
      </div>

      {/* Schedule Upload Section */}
      <div className="flex-1 bg-gray-200 p-4 rounded-lg shadow-md">
        <ScheduleUpload />
      </div>

      {/* Match Manager Section */}
      <div className="flex-1 bg-gray-300 p-4 rounded-lg shadow-md">
        <MatchManager />
      </div>
    </div>
  );
};

export default Schedule;

import React, { useState } from "react";
import axios from "axios";

const MatchManager = () => {
  const [matchId, setMatchId] = useState("");
  const [match, setMatch] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [token] = useState(localStorage.getItem("authToken")); // JWT Token

  // Fetch Match Details
  const fetchMatch = async () => {
    if (!matchId) {
      alert("Please enter a Match ID!");
      return;
    }

    try {
      const response = await axios.get(
        `https://sports-backend.apps-dev.creditsafe.com/api/match/${matchId}`
      );
      setMatch(response.data);
      setFormData(response.data);
    } catch (error) {
      alert("Match not found!");
      console.error("Error fetching match data", error);
    }
  };

  // Handle Edit Mode
  const handleEdit = () => setIsEditing(true);

  // Handle Delete
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this match?")) {
      try {
        await axios.delete(`https://sports-backend.apps-dev.creditsafe.com/api/match/${matchId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Match deleted successfully");
        setMatch(null);
        setMatchId("");
      } catch (error) {
        console.error("Error deleting match", error);
      }
    }
  };

  // Handle Update
  const handleUpdate = async () => {
    try {
      await axios.patch(
        `https://sports-backend.apps-dev.creditsafe.com/api/match/${matchId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Match updated successfully");
      setIsEditing(false);
      fetchMatch();
    } catch (error) {
      console.error("Error updating match", error);
    }
  };

  // Handle Input Change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Match Management</h2>

      {/* Match ID Input */}
      <div className="mb-4 flex">
        <input
          type="text"
          value={matchId}
          onChange={(e) => setMatchId(e.target.value)}
          placeholder="Enter Match ID"
          className="border p-2 flex-grow rounded"
        />
        <button
          onClick={fetchMatch}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
        >
          Fetch Match
        </button>
      </div>

      {/* Match Details */}
      {match && (
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Match Details</h3>
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                name="player1"
                value={formData.player1}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Player 1"
              />
              <input
                type="text"
                name="player2"
                value={formData.player2}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Player 2"
              />
              <input
                type="text"
                name="team1"
                value={formData.team1}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Team 1"
              />
              <input
                type="text"
                name="team2"
                value={formData.team2}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Team 2"
              />
              <input
                type="text"
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Sport"
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Category"
              />
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Venue"
              />
              <input
                type="text"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Comments"
              />
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Status"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white p-2 rounded w-full"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div>
              <p>
                <strong>Players:</strong> {match.player1} vs {match.player2}
              </p>
              <p>
                <strong>Teams:</strong> {match.team1} vs {match.team2}
              </p>
              <p>
                <strong>Sport:</strong> {match.sport}
              </p>
              <p>
                <strong>Category:</strong> {match.category}
              </p>
              <p>
                <strong>Venue:</strong> {match.venue}
              </p>
              <p>
                <strong>Comments:</strong> {match.comments}
              </p>
              <p>
                <strong>Status:</strong> {match.status}
              </p>
              <p>
                <strong>Date:</strong> {match.date}
              </p>
              <p>
                <strong>Time:</strong> {match.time}
              </p>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={handleEdit}
                  className="bg-yellow-500 text-white p-2 rounded w-full"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white p-2 rounded w-full"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
