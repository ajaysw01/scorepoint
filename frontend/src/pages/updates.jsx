import { useState } from "react";
import MatchScheduleCard from "../pages/matchSchedule";

const sportsCategories = {
  Cricket: ["none"],
  Badminton: [
    "men_singles",
    "men_doubles",
    "women_singles",
    "women_doubles",
    "mixed_doubles",
  ],
  TableTennis: [
    "men_singles",
    "men_doubles",
    "women_singles",
    "women_doubles",
    "mixed_doubles",
  ],
  Carrom: [
    "men_singles",
    "men_doubles",
    "women_singles",
    "women_doubles",
    "mixed_doubles",
  ],
  Darts: ["none"],
};

const Updates = () => {
  const [currentSport, setCurrentSport] = useState("Cricket");
  const [currentCategory, setCurrentCategory] = useState(
    sportsCategories["Cricket"][0]
  );

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Match Updates
      </h1>

      {/* Sport Selection */}
      <div className="flex justify-center mb-4">
        <div className="flex overflow-x-auto space-x-2 px-2">
          {Object.keys(sportsCategories).map((sport) => (
            <button
              key={sport}
              onClick={() => {
                setCurrentSport(sport);
                setCurrentCategory(sportsCategories[sport][0]);
              }}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                currentSport === sport
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {sport}
            </button>
          ))}
        </div>
      </div>

      {/* Category Selection - Hide if category is "none" */}
      {!(sportsCategories[currentSport].length === 1 && sportsCategories[currentSport][0] === "none") && (
        <div className="flex justify-center mb-6">
          <div className="flex overflow-x-auto space-x-2 px-2">
            {sportsCategories[currentSport].map(
              (category) =>
                category !== "none" && (
                  <button
                    key={category}
                    onClick={() => setCurrentCategory(category)}
                    className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      currentCategory === category
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                )
            )}
          </div>
        </div>
      )}

      {/* Match Schedule Card */}
      <MatchScheduleCard sport={currentSport} category={currentCategory} />
    </div>
  );
};

export default Updates;
