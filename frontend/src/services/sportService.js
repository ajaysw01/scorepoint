import axios from "axios";

const API_URL = "http://localhost:8000/api/sports"; // Adjust based on your backend

// ✅ Helper function to add JWT token to headers
const getAuthHeader = (token) => {
  if (!token) {
    console.error("❌ No token provided!");
    throw new Error("Unauthorized: No token found");
  }
  return { headers: { Authorization: `Bearer ${token}` } };
};
// ✅ Get all sports (No auth required)
const getSports = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ✅ Get a single sport by ID (No auth required)
const getSportById = async (sportId) => {
  const response = await axios.get(`${API_URL}/${sportId}`);
  return response.data;
};

// ✅ Create a new sport (Requires JWT)
const createSport = async (sportData, token) => {
  const response = await axios.post(API_URL, sportData, getAuthHeader(token));
  return response.data;
};

// ✅ Update an existing sport (Requires JWT)
const updateSport = async (sportId, sportData, token) => {
  const response = await axios.put(
    `${API_URL}/${sportId}`,
    sportData,
    getAuthHeader(token)
  );
  return response.data;
};

// ✅ Delete a sport (Requires JWT)
const deleteSport = async (sportId, token) => {
  await axios.delete(`${API_URL}/${sportId}`, getAuthHeader(token));
};

// ✅ Add bonus points to a sport (Requires JWT) [If applicable]
const addSportBonus = async (sportId, bonus, token) => {
  const response = await axios.post(
    `${API_URL}/${sportId}/bonus?bonus=${bonus}`,
    {},
    getAuthHeader(token)
  );
  return response.data;
};

const sportService = {
  getSports,
  getSportById,
  createSport,
  updateSport,
  deleteSport,
  addSportBonus,
};
export default sportService;
