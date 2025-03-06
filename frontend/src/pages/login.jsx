import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://scorepoint.onrender.com/api/auth/login";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
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
            alert(message || "Login successful");
            navigate("/admin-dashboard");  // Redirect to Admin Dashboard
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-6 text-blue-600">Admin Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="w-full">
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                        Login
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
