import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { UploadCloud } from "lucide-react";

const BulkUpload = () => {
  const [fileData, setFileData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [editingData, setEditingData] = useState([]);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        const formattedData = jsonData.map((row) => ({
          player_id: "",
          sport_id: row.sport_id || 0,
          category: row.category || "men_singles",
          competition_level: row.competition_level || "",
          points: row.points || 0,
          player_name: row.player_name || "",
          possible_players: [], // Will store player_id + player_name + team_name
        }));
        setFileData(formattedData);
        setEditingData(formattedData);
      };
    }
  };

  // Fetch Player IDs
  const fetchPlayerIds = async () => {
    const updatedData = [...editingData];

    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].player_name) {
        try {
          const response = await axios.get(
            `http://18.201.173.70/api/teams/player/search?name=${updatedData[i].player_name}`
          );
          const players = response.data.map((player) => ({
            player_id: player.player_id,
            player_name: player.player_name,
            team_name: player.team_name || "Unknown Team",
          }));

          if (players.length === 1) {
            updatedData[i].player_id = players[0].player_id; // Assign directly if one match
          } else if (players.length > 1) {
            updatedData[i].possible_players = players; // Store multiple matches
          }
        } catch (error) {
          console.error("Error fetching player IDs");
        }
      }
    }
    setEditingData(updatedData);
  };

  // Assign selected Player ID
  const handleAssignPlayerId = (index, playerId) => {
    const updatedData = [...editingData];
    updatedData[index].player_id = Number(playerId);
    setEditingData(updatedData);
  };

  // Handle Input Change
  const handleInputChange = (index, field, value) => {
    const updatedData = [...editingData];
    updatedData[index][field] = value;
    setEditingData(updatedData);
  };

  // Submit Data
  const handleSubmit = async () => {
    if (editingData.some((row) => !row.player_id)) {
      alert("Assign player IDs before submitting.");
      return;
    }

    const payload = {
      player_points: editingData.map(
        ({ player_id, sport_id, category, competition_level, points }) => {
          const data = {
            player_id: Number(player_id), // Ensure it's stored as a number
            sport_id,
            competition_level,
            points,
          };
          if (category && category.trim() !== "") {
            data.category = category; // Only include if category is present
          }
          return data;
        }
      ),
    };

    console.log(payload);
    const token = localStorage.getItem("authToken");

    try {
      await axios.post(
        "http://18.201.173.70/api/points/player/submit_batch",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Data uploaded successfully!");
      setFileData([]);
      setEditingData([]);
      setFileName("");
    } catch (error) {
      alert("Error uploading data!");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-20 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Bulk Upload Player Points</h2>

      {/* File Upload */}
      <div className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center cursor-pointer">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="hidden"
          id="fileUpload"
        />
        <label
          htmlFor="fileUpload"
          className="flex flex-col items-center cursor-pointer"
        >
          <UploadCloud size={40} className="text-blue-500" />
          <span className="text-gray-600">
            Click or Drag & Drop to Upload Excel File
          </span>
        </label>
      </div>
      {fileName && (
        <p className="mt-2 text-sm text-gray-700">Uploaded File: {fileName}</p>
      )}

      {/* Data Table */}
      {editingData.length > 0 && (
        <div className="mt-4 max-h-80 overflow-y-auto border rounded-md p-2">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr className="border border-gray-300">
                <th className="p-2 text-left">Player Name</th>
                <th className="p-2 text-left">Player ID</th>
                <th className="p-2 text-left">Sport ID</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Competition Level</th>
                <th className="p-2 text-left">Points</th>
              </tr>
            </thead>
            <tbody>
              {editingData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border border-gray-300">
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.player_name}
                      onChange={(e) =>
                        handleInputChange(
                          rowIndex,
                          "player_name",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </td>
                  <td className="p-2">
                    {row.player_id ? (
                      row.player_id
                    ) : row.possible_players.length > 1 ? (
                      <select
                        onChange={(e) =>
                          handleAssignPlayerId(rowIndex, e.target.value)
                        }
                      >
                        <option value="">Select Player</option>
                        {row.possible_players.map((player) => (
                          <option
                            key={player.player_id}
                            value={player.player_id}
                          >
                            {player.player_name} - {player.team_name} (ID:{" "}
                            {player.player_id})
                          </option>
                        ))}
                      </select>
                    ) : (
                      "Fetching..."
                    )}
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={row.sport_id}
                      onChange={(e) =>
                        handleInputChange(rowIndex, "sport_id", e.target.value)
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.category}
                      onChange={(e) =>
                        handleInputChange(rowIndex, "category", e.target.value)
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.competition_level}
                      onChange={(e) =>
                        handleInputChange(
                          rowIndex,
                          "competition_level",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={row.points}
                      onChange={(e) =>
                        handleInputChange(rowIndex, "points", e.target.value)
                      }
                      className="w-full p-2 border rounded-md"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          onClick={fetchPlayerIds}
        >
          Fetch IDs
        </button>
        <button
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          onClick={handleSubmit}
        >
          Submit Data
        </button>
      </div>
    </div>
  );
};

export default BulkUpload;
