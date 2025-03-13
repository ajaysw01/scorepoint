import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-magic px-4 sm:px-12 md:px-20 lg:px-32">
      {/* Main Content */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between">
        {/* Left Side - "The Annual Sports 2025" */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-orange-400 drop-shadow-lg magic-text text-center md:text-left"
          initial={{ opacity: 0, x: -150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Creditsafe <br /> Annual <br /> Sports <br /> 2025
        </motion.h1>

        {/* Right Side - "Celebrilite 2025" & Tagline */}
        <div className="text-center md:text-right mt-8 md:mt-0">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-orange-400 drop-shadow-lg magic-text"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Celebrilite
          </motion.h2>

          <motion.p
            className="text-md sm:text-lg md:text-xl text-gray-300 mt-2 magic-text"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Where Magic Meets Competition!
          </motion.p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-gray-300 p-4 mt-12 md:mt-20">
        <p>@ Celebrelite 2025</p>
      </footer>
    </div>
  );
};

export default Home;