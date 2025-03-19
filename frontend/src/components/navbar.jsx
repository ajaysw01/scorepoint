import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check login status on each render
  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-white-600 to-red-600 shadow-lg">
      <div className="container mx-auto flex justify-between items-center h-20 px-4">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold flex items-center">
          <img src="static/images/CreditsafeLogo.png" alt="Creditsafe Logo" className="h-36 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {["updates", "rules", "scores", "teams", "leaderboard"].map((item) => (
            <li key={item}>
              <Link to={`/${item}`} className="text-white text-lg hover:text-gray-200 transition-colors">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </li>
          ))}

          {/* Show Admin Login or Logout */}
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout} className="text-white text-lg hover:text-gray-200 transition-colors">
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="text-white text-lg hover:text-gray-200 transition-colors">
                Admin Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-white-600 to-red-600 p-4 mt-2 rounded-lg shadow-lg">
          <ul className="flex flex-col space-y-4">
            {["updates", "rules", "scores", "teams", "leaderboard"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item}`}
                  className="text-white text-lg block hover:text-gray-200 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </li>
            ))}

            {/* Show Admin Login or Logout */}
            {isLoggedIn ? (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-white text-lg block hover:text-gray-200 transition-colors"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="text-white text-lg block hover:text-gray-200 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
