import React, { useState } from "react";
import axios from "axios";

const AddScore = () => {
  const [playerData, setPlayerData] = useState({
    player_id: "",
    sport_id: "",
    category: "",
    competition_level: "",
    points: "",
  });

  const [bonusData, setBonusData] = useState({
    team_id: "",
    sport_id: "",
    bonus_points: "",
  });

  const handlePlayerChange = (e) => {
    setPlayerData({ ...playerData, [e.target.name]: e.target.value });
  };

  const handleBonusChange = (e) => {
    setBonusData({ ...bonusData, [e.target.name]: e.target.value });
  };

  // Retrieve JWT token from local storage
  const getToken = () => localStorage.getItem("authToken");

  const submitPlayerPoints = async () => {
    try {
      const token = getToken();
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      console.log(playerData);

      await axios.post(
        "https://scorepoint.onrender.com/api/points/player/submit",
        playerData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Player points submitted successfully");
    } catch (error) {
      alert("Error submitting player points");
    }
  };

  const submitBonusPoints = async () => {
    try {
      const token = getToken();
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      await axios.post(
        "https://scorepoint.onrender.com/api/points/team/bonus",
        bonusData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Bonus points assigned successfully");
    } catch (error) {
      alert("Error assigning bonus points");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Player Score Submission */}
      <Card className="w-full max-w-lg p-6 shadow-lg">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Submit Player Points</h2>
          <Label>Player ID</Label>
          <Input type="number" name="player_id" onChange={handlePlayerChange} />
          <Label>Sport ID</Label>
          <Input type="number" name="sport_id" onChange={handlePlayerChange} />
          <Label>Category</Label>
          <Input type="text" name="category" onChange={handlePlayerChange} />
          <Label>Competition Level</Label>
          <Input type="text" name="competition_level" onChange={handlePlayerChange} />
          <Label>Points</Label>
          <Input type="number" name="points" onChange={handlePlayerChange} />
          <Button className="mt-4 w-full" onClick={submitPlayerPoints}>
            Submit
          </Button>
        </CardContent>
      </Card>

      {/* Team Bonus Submission */}
      <Card className="w-full max-w-lg p-6 shadow-lg">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Assign Bonus Points</h2>
          <Label>Team ID</Label>
          <Input type="number" name="team_id" onChange={handleBonusChange} />
          <Label>Sport ID</Label>
          <Input type="number" name="sport_id" onChange={handleBonusChange} />
          <Label>Bonus Points</Label>
          <Input type="number" name="bonus_points" onChange={handleBonusChange} />
          <Button className="mt-4 w-full" onClick={submitBonusPoints}>
            Assign Bonus
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddScore;

// UI Components

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-2xl shadow-md p-4 ${className}`}>{children}</div>
);

const CardContent = ({ children }) => <div className="p-4">{children}</div>;

const Button = ({ children, className, onClick }) => (
  <button
    className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Input = ({ type, name, onChange }) => (
  <input
    type={type}
    name={name}
    onChange={onChange}
    className="w-full p-2 border rounded-md mt-1"
  />
);

const Label = ({ children }) => <label className="font-medium text-gray-700">{children}</label>;
