import axios from "axios";

const API_URL = "http://localhost:8000/api";

// ✅ Login User (Now stores role)
const login = async (credentials) => {
  const formData = new URLSearchParams();
  formData.append("username", credentials.username);
  formData.append("password", credentials.password);

  const response = await axios.post(`${API_URL}/auth/login`, formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return {
    access_token: response.data.access_token, // ✅ Extract token
    role: response.data.role, // ✅ Extract role
  };
};

// ✅ Logout User (No localStorage usage)
const logout = () => {};

// ✅ Register User
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

const authService = {
  login,
  logout,
  register,
};

export default authService;
