import { motion } from "framer-motion";

const Home = () => {
    return (
        <div>
        <div className="relative w-full h-screen overflow-hidden text-white bg-magic flex items-center justify-between px-70">

            {/* Left Side - "The Annual Sports 2025" */}
            <motion.h1
                className="text-5xl md:text-7xl font-bold text-orange-400 drop-shadow-lg  magic-text"
                initial={{ opacity: 0, x: -150 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                Creditsafe <br /> Annual <br />Sports <br /> 2025
            </motion.h1>

            {/* Right Side - "Celebrilite 2025" & Tagline */}
            <div className="text-right">
                <motion.h2
                    className="text-5xl md:text-7xl font-bold text-orange-400 drop-shadow-lg  magic-text"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Celebrilite  
                </motion.h2>

                <motion.p
                    className="text-lg md:text-2xl text-gray-300 mt-2 magic-text"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    Where Magic Meets Competition!
                </motion.p>
                </div>
                <footer className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center p-4 text-gray-300 w-full">
                    <p>@ Celebrelite 2025</p>
                </footer>
                
        </div>
        
            </div>

    );
};

export default Home;
