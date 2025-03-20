import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Get user info from localStorage
  const authToken = localStorage.getItem("authToken");
  const adminName = localStorage.getItem("adminName"); // Store admin name in localStorage
  const isLoggedIn = !!authToken;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminName");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-white-600 to-red-600 shadow-lg">
      <div className="container mx-auto flex justify-between items-center h-20 px-4">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold flex items-center">
          <img
            src="/assets/images/CreditsafeLogo.png"
            alt="Creditsafe Logo"
            className="h-36 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {["updates", "rules", "scores", "teams", "rankings", "leaderboard", "about"].map((item) => (
            <li key={item}>
              <Link to={`/${item}`} className="text-white text-lg hover:text-gray-200 transition-colors">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </li>
          ))}

          {/* Admin Icon & Dropdown */}
          {isLoggedIn ? (
            <li className="relative">
              <button
                className="flex items-center text-white text-lg hover:text-gray-200 transition-colors"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <User className="mr-2" size={24} /> {adminName}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/admin-dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
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
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-white-600 to-red-600 p-4 mt-2 rounded-lg shadow-lg">
          <ul className="flex flex-col space-y-4">
            {["updates", "rules", "scores", "teams", "rankings", "leaderboard", "about"].map((item) => (
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

            {/* Admin Section (Mobile) */}
            {isLoggedIn ? (
              <>
                <li>
                  <button
                    className="text-white text-lg flex items-center"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <User className="mr-2" size={24} /> {adminName}
                  </button>
                </li>
                {dropdownOpen && (
                  <div className="bg-white rounded-lg shadow-md p-2 mt-2">
                    <ul>
                      <li>
                        <Link
                          to="/admin-dashboard"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                          onClick={() => {
                            setDropdownOpen(false);
                            setIsOpen(false);
                          }}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleLogout();
                            setDropdownOpen(false);
                            setIsOpen(false);
                          }}
                          className="w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-200"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
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
