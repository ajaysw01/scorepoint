import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify
const SEARCH_PLAYER_API_URL =
  "https://scorepoint.onrender.com/api/players/search";

const SearchPlayer = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerData, setPlayerData] = useState([]); // Ensure it's always an array

  const handleSearch = async () => {
    try {
      // Reset previous notifications
      toast.dismiss();
      const response = await axios.get(
        `${SEARCH_PLAYER_API_URL}?name=${playerName}`
      );
      console.log(response.data);

      // Ensure response is a list
      setPlayerData(Array.isArray(response.data) ? response.data : []);

      // Show success toast if players are found
      if (response.data.length > 0) {
        toast.success("Players found!");
      } else {
        toast.info("No players found.");
      }
    } catch (error) {
      setPlayerData([]); // Reset data on error
      toast.error("Error occurred while fetching players.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <input
        type="text"
        placeholder="Search Player"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {playerData.length > 0 ? (
        playerData.map((player, index) => (
          <div
            key={index}
            style={{
              marginTop: "20px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <h3 style={{ margin: 0 }}>
              {player.player_name || "Unknown Player"}
            </h3>
            <p>Sport: {player.sport_name || "Not Available"}</p>
            <p>Category: {player.sport_category || "Not Available"}</p>
            <p>Player Points: {player.player_points ?? "Not Available"}</p>
            <p>Team Points: {player.team_points ?? "Not Available"}</p>
          </div>
        ))
      ) : (
        <p style={{ marginTop: "20px" }}></p>
      )}

      {/* ToastContainer to render notifications */}
      <ToastContainer />
    </div>
  );
};

export default SearchPlayer;
