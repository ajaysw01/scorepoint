import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

// Import Animations
import cricketAnimation from "/src/static/animations/cricket.json";
import badmintonAnimation from "/src/static/animations/badminton.json";
import tableTennisAnimation from "/src/static/animations/tabletennis.json";
import carromAnimation from "/src/static/animations/carrom.json";
import dartsAnimation from "/src/static/animations/darts.json";

// Sports Config with Default Frames
const sports = [
  {
    name: "Cricket",
    animation: cricketAnimation,
    path: "/cricket",
    defaultFrame: 50,
  },
  {
    name: "Badminton",
    animation: badmintonAnimation,
    path: "/badminton",
    defaultFrame: 15,
  },
  {
    name: "Table Tennis",
    animation: tableTennisAnimation,
    path: "/tabletennis",
    defaultFrame: 50,
  },
  {
    name: "Carrom",
    animation: carromAnimation,
    path: "/carrom",
    defaultFrame: 50,
  },
  {
    name: "Darts",
    animation: dartsAnimation,
    path: "/Darts/6/none",
    defaultFrame: 50,
  },
  {
    name: "Fun Friday",
    image: "/assets/images/funfriday.png",
    path: "/Fun Friday/5/none",
  }, // Static Image
];

const Scores = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-black mb-6">
        Choose Your Sport
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {sports.map((sport) => (
          <Link
            to={sport.path}
            key={sport.name}
            className="group"
            aria-label={`Go to ${sport.name}`}
          >
            <div className="relative overflow-hidden rounded-2xl border border-gray-300 hover:border-gray-500 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 bg-white">
              {/* Animation/Image Container */}
              <div className="w-full h-60 sm:h-72 flex items-center justify-center p-4 sm:p-2">
                {sport.animation ? (
                  <HoverLottie
                    animationData={sport.animation}
                    speed={1}
                    defaultFrame={sport.defaultFrame}
                  />
                ) : (
                  <img
                    src={sport.image}
                    alt={sport.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                )}
              </div>

              {/* Sports Name Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 sm:p-4">
                <h2 className="text-white text-xl sm:text-3xl font-semibold text-center group-hover:text-yellow-400 transition-colors duration-300">
                  {sport.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// 🎉 Custom Lottie Component: Shows Default Frame, Animates on Hover
const HoverLottie = ({ animationData, speed = 1, defaultFrame = 50 }) => {
  const lottieRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed);
      if (isHovered) {
        lottieRef.current.play();
      } else {
        lottieRef.current.goToAndStop(defaultFrame, true);
      }
    }
  }, [isHovered, speed, defaultFrame]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-full flex items-center justify-center"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={true}
        autoplay={false} // Prevent autoplay on load
        style={{
          width: "80%", // Scale down animation on mobile
          height: "80%", // Scale down animation on mobile
        }}
      />
    </div>
  );
};

export default Scores;
