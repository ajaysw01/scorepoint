import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx"; // Excel Parsing & Exporting

const TEAMS_API_URL = "https://sports-backend.apps-dev.creditsafe.com/api/teams";

const TeamsManagement = () => {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState([""]);
  const [editingTeam, setEditingTeam] = useState(null); // Track which team is being edited
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(TEAMS_API_URL);
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleCreateTeam = async () => {
    try {
      await axios.post(
        TEAMS_API_URL,
        { name: teamName, players: players.map((name) => ({ name })) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTeams();
      setTeamName("");
      setPlayers([""]);
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      await axios.delete(`${TEAMS_API_URL}/${teamId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTeams();
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  const handleUpdateTeam = async () => {
    if (!editingTeam) return;

    try {
      const updatedPlayers = editingTeam.players.map((player) => ({
        id: player.id || null, // Use null instead of undefined (if no ID, it might be a new player)
        name: typeof player === "string" ? player : player.name, // Handle cases where players are stored as strings
      }));

      console.log("Updating Team:", {
        name: editingTeam.name,
        players: updatedPlayers,
      });

      await axios.put(
        `${TEAMS_API_URL}/${editingTeam.id}`,
        { name: editingTeam.name, players: updatedPlayers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchTeams();
      setEditingTeam(null);
    } catch (error) {
      console.error(
        "Error updating team:",
        error.response ? error.response.data : error
      );
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (!rows.length) return alert("Invalid Excel file format.");

      const teamMap = new Map();
      rows.slice(1).forEach(([team, player]) => {
        if (!team || !player) return;
        if (!teamMap.has(team)) {
          teamMap.set(team, []);
        }
        teamMap.get(team).push({ name: player });
      });

      const teamsFromExcel = Array.from(teamMap.entries()).map(
        ([name, players]) => ({ name, players })
      );
      bulkCreateTeams(teamsFromExcel);
    };

    reader.readAsArrayBuffer(file);
  };

  const bulkCreateTeams = async (teamsData) => {
    try {
      await Promise.all(
        teamsData.map((team) =>
          axios.post(TEAMS_API_URL, team, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      fetchTeams();
      alert("Teams uploaded successfully!");
    } catch (error) {
      console.error("Error uploading teams:", error);
    }
  };

  const exportToExcel = () => {
    const exportData = teams.flatMap((team) =>
      team.players.map((player) => ({
        "Team Name": team.name,
        "Player Name": player.name,
      }))
    );

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Teams");
    XLSX.writeFile(workbook, "Teams.xlsx");
  };

  return (
    console.log(teams),
    (
      <div className="p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">
          Manage Teams
        </h2>

        {/* Upload & Export Section */}
        <div className="bg-white shadow-lg p-6 rounded-lg mb-6 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Bulk Upload Teams via Excel
            </h3>
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileUpload}
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={exportToExcel}
            className="bg-green-500 text-white p-2 rounded"
          >
            Export to Excel 📂
          </button>
        </div>

        {/* Create & Edit Team Form */}
        <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingTeam ? "Edit Team" : "Create New Team"}
          </h3>
          <input
            type="text"
            placeholder="Team Name"
            value={editingTeam ? editingTeam.name : teamName}
            onChange={(e) =>
              editingTeam
                ? setEditingTeam({ ...editingTeam, name: e.target.value })
                : setTeamName(e.target.value)
            }
            className="border p-2 rounded w-full mb-2"
          />
          {(editingTeam ? editingTeam.players : players).map(
            (player, index) => (
              <input
                key={index}
                type="text"
                placeholder="Player Name"
                value={player}
                onChange={(e) => {
                  const updatedPlayers = [
                    ...(editingTeam ? editingTeam.players : players),
                  ];
                  updatedPlayers[index] = e.target.value;
                  editingTeam
                    ? setEditingTeam({
                        ...editingTeam,
                        players: updatedPlayers,
                      })
                    : setPlayers(updatedPlayers);
                }}
                className="border p-2 rounded w-full mb-2"
              />
            )
          )}
          <button
            onClick={() => setPlayers([...players, ""])}
            className="bg-blue-500 text-white p-2 mr-2 rounded"
          >
            + Add Player
          </button>
          {editingTeam ? (
            <button
              onClick={handleUpdateTeam}
              className="bg-yellow-500 text-white p-2 rounded"
            >
              Update Team
            </button>
          ) : (
            <button
              onClick={handleCreateTeam}
              className="bg-green-500 text-white p-2 rounded"
            >
              Create Team
            </button>
          )}
        </div>

        {/* Teams List */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Teams</h3>
          {teams.length === 0 ? (
            <p className="text-gray-500">No teams available.</p>
          ) : (
            <ul className="space-y-4">
              {teams.map((team) => (
                <li
                  key={team.id}
                  className="border p-4 rounded flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-lg font-semibold">{team.name}</h4>
                    <p className="text-gray-600">
                      {team.players.map((p) => p.name).join(", ")}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        setEditingTeam({
                          ...team,
                          players: team.players.map((p) => p.name),
                        })
                      }
                      className="bg-yellow-500 text-white p-2 rounded mr-2"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTeam(team.id)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  );
};

export default TeamsManagement;
