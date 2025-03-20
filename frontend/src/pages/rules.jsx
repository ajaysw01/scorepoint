import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

import generalAnimation from "/src//static/animations/general.json";

// Sports Config (with static images)
const sports = [
  {
    name: "Cricket",
    image: "/src/static/images/cricket.jpg",
    path: "/cricketrules",
  },
  {
    name: "Badminton",
    image: "/src/static/images/badminton.jpg",
    path: "/badmintonrules",
  },
  {
    name: "Table Tennis",
    image: "/src/static/images/tabletennis.jpg",
    path: "/tabletennisrules",
  },
  {
    name: "Carrom",
    image: "/src/static/images/carrom.jpg",
    path: "/carromrules",
  },
  { name: "Darts", image: "/src/static/images/darts.jpg", path: "/dartsrules" },
  { name: "General", animation: generalAnimation, path: "/funfridayrules" }, // General Animation
];

const Rules = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 px-4 sm:px-6">
      <h1 className="text-4xl font-bold text-center text-black mb-8">Rules</h1>

      {/* Sports Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {sports.map((sport) => (
          <Link
            to={sport.path}
            key={sport.name}
            className="group"
            aria-label={`Go to ${sport.name}`}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 bg-white">
              {/* Static Image or Animation */}
              {sport.animation ? (
                <Lottie
                  animationData={sport.animation}
                  className="w-full h-60"
                />
              ) : (
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              )}

              {/* Sports Name Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h2 className="text-white text-3xl font-semibold text-center group-hover:text-yellow-400 transition-colors duration-300">
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

export default Rules;
