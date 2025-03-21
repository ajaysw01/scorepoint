import { motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-magic">
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-white px-4 sm:px-12 md:px-20 lg:px-32">
        {/* Main Container */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between">
          {/* Left Side - "The Annual Sports 2025" */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg magic-heading text-center md:text-left"
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Creditsafe <br /> Annual <br /> Sports <br /> 2025
          </motion.h1>

          {/* Right Side - "Celebrilite 2025" & Tagline */}
          <div className="text-center md:text-right mt-8 md:mt-0">
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg magic-heading"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Celebrelite
            </motion.h2>

            <motion.p
              className="text-md sm:text-lg md:text-xl mt-2 magic-tagline"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Where Magic Meets Competition!
            </motion.p>
          </div>
        </div>
      </div>

      <footer className="w-full text-center text-gray-300 p-4 bg-transparent">
        <p>&copy; Celebrelite 2025</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="https://www.creditsafe.com/in/en.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-gray-300"
          >
            Creditsafe Technology
          </a>
          <span>|</span>
          <a
            href="https://www.linkedin.com/company/creditsafe-technology/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:underline text-gray-300"
          >
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </a>
          <span>|</span>
          <a
            href="https://www.instagram.com/creditsafe_technology?igsh=MW16bmw3YnV5N3V6aA=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:underline text-gray-300"
          >
            <Instagram size={18} />
            <span>Instagram</span>
          </a>
        </div>
      </footer>


    </div>
  );
};

export default Home;
