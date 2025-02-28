import axios from "axios";

const API_URL = "http://localhost:8000/api/teams"; // Adjust based on your backend

// ✅ Helper function to add JWT token to headers
const getAuthHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// ✅ Get all teams (No auth required)
const getTeams = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ✅ Get a single team by ID (No auth required)
const getTeamById = async (teamId) => {
  const response = await axios.get(`${API_URL}/${teamId}`);
  return response.data;
};

// ✅ Create a new team (Requires JWT)
const createTeam = async (teamData, token) => {
  const response = await axios.post(API_URL, teamData, getAuthHeader(token));
  return response.data;
};

// ✅ Update an existing team (Requires JWT)
const updateTeam = async (teamId, teamData, token) => {
  const response = await axios.put(`${API_URL}/${teamId}`, teamData, getAuthHeader(token));
  return response.data;
};

// ✅ Delete a team (Requires JWT)
const deleteTeam = async (teamId, token) => {
  await axios.delete(`${API_URL}/${teamId}`, getAuthHeader(token));
};

// ✅ Add bonus points to a team in a specific sport (Requires JWT)
const addTeamBonus = async (teamId, sportId, bonus, token) => {
  const response = await axios.post(
    `${API_URL}/${teamId}/sports/${sportId}/bonus?bonus=${bonus}`,
    {},
    getAuthHeader(token)
  );
  return response.data;
};

const teamService = { getTeams, getTeamById, createTeam, updateTeam, deleteTeam, addTeamBonus };
export default teamService;
