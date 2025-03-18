import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-white-600 to-red-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          <img
            src="static/images/Creditsafe-Logo-Red.png"
            alt="Creditsafe Logo"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              to="/updates"
              className="text-white text-lg hover:text-gray-200"
            >
              Updates
            </Link>
          </li>
          <li>
            <Link
              to="/rules"
              className="text-white text-lg hover:text-gray-200"
            >
              Rules
            </Link>
          </li>
          <li>
            <Link
              to="/scores"
              className="text-white text-lg hover:text-gray-200"
            >
              Scores
            </Link>
          </li>
          <li>
            <Link
              to="/teams"
              className="text-white text-lg hover:text-gray-200"
            >
              Teams
            </Link>
          </li>
          <li>
            <Link
              to="/leaderboard"
              className="text-white text-lg hover:text-gray-200"
            >
              Leaderboard
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-white text-lg hover:text-gray-200"
            >
              Admin Login
            </Link>
          </li>
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
            <li>
              <Link
                to="/updates"
                className="text-white text-lg block hover:text-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Updates
              </Link>
            </li>
            <li>
              <Link
                to="/rules"
                className="text-white text-lg block hover:text-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Rules
              </Link>
            </li>
            <li>
              <Link
                to="/scores"
                className="text-white text-lg block hover:text-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Scores
              </Link>
            </li>
            <li>
              <Link
                to="/teams"
                className="text-white text-lg block hover:text-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Teams
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                className="text-white text-lg block hover:text-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-white text-lg block hover:text-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
