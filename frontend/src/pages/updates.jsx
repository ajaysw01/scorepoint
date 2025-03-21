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
  "Table Tennis": [
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
  const [showTable, setShowTable] = useState(false);

  const handleDownload = (sport, category) => {
    const formattedSport = sport.replace(/\s+/g, "");
    const fileName = `${formattedSport}_${category}.pdf`;
    const filePath = `/assets/${fileName}`;

    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Match Updates
      </h1>
      {!showTable && (
        <div className="flex justify-center mb-4">
          <div className="flex overflow-x-auto space-x-2 px-2">
            {Object.keys(sportsCategories).map((sport) => (
              <button
                key={sport}
                onClick={() => {
                  setCurrentSport(sport);
                  setCurrentCategory(sportsCategories[sport][0]);
                }}
                className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                  currentSport === sport
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {sport}
              </button>
            ))}
            <button
              onClick={() => setShowTable(true)}
              className="whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg bg-blue-500 text-white transition-all cursor-pointer"
            >
              Download Schedule
            </button>
          </div>
        </div>
      )}

      {!showTable && sportsCategories[currentSport].length > 1 && (
        <div className="flex justify-center mb-4">
          <div className="flex space-x-2">
            {sportsCategories[currentSport].map((category) => (
              <button
                key={category}
                onClick={() => setCurrentCategory(category)}
                className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer capitalize  ${
                  currentCategory === category
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {category.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
      )}

      {showTable && (
        <div className="mt-4">
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowTable(false)}
              className="whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg bg-red-500 text-white transition-all cursor-pointer"
            >
              Back
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {["TableTennis", "Carrom"].map((sport) => (
              <div
                key={sport}
                className="p-6 border rounded-2xl shadow-md bg-white text-black w-80 transform hover:shadow-2xl transition-shadow duration-300"
              >
                <h2 className="text-3xl font-semibold mb-4 text-center text-red-500">
                  {sport}
                </h2>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  {sportsCategories[sport].map((category) => (
                    <li
                      key={`${sport}-${category}`}
                      className="flex items-center text-lg text-black capitalize "
                    >
                      <span className="mr-2 text-red-500">•</span>
                      <button
                        onClick={() => handleDownload(sport, category)}
                        className="hover:text-red-600 transition-colors cursor-pointer capitalize"
                      >
                        {category.replace("_", " ")}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {!showTable && (
        <MatchScheduleCard sport={currentSport} category={currentCategory} />
      )}
    </div>
  );
};

export default Updates;
