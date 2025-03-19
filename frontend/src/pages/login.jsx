import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = "http://18.201.173.70/api/auth/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader on submit

    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { access_token, message } = response.data;
      localStorage.setItem("authToken", access_token);
      toast.success(message || "Login successful");
      navigate("/admin-dashboard"); // Redirect to Admin Dashboard
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false); // Hide loader after response
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div
        className={`w-96 bg-white p-8 rounded-lg shadow-lg flex flex-col items-center transition-all duration-300 ${
          isLoading ? "opacity-50" : "opacity-100"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Admin Login</h2>

        <form onSubmit={handleSubmit} className="w-full">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Loading...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          <b>Note:</b> This is only for Admin
        </p>
      </div>
    </div>
  );
};

export default Login;
