import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Calendar, Users } from "lucide-react";

// Sample Data for 4 Weeks of Fun Friday Events
const funFridayData = [
    {
        week: "Week 1",
        activity: "Ultimate Scavenger Hunt",
        date: "March 8, 2025",
        conductingTeam: "The Explorers",
        winner: "Team Phoenix",
        description: "An exhilarating scavenger hunt with hidden treasures across the office!",
        pointsTable: {
            "Team Phoenix": 95,
            "The Trailblazers": 88,
            "Code Crusaders": 83,
            "The Innovators": 78,
            "Dynamic Developers": 72,
            "The Mavericks": 68,
            "Creative Thinkers": 64,
            "The Problem Solvers": 60,
        },
    },
    {
        week: "Week 2",
        activity: "Office Olympics",
        date: "March 15, 2025",
        conductingTeam: "The Warriors",
        winner: "Dynamic Developers",
        description: "Mini office games including chair races and table tennis!",
        pointsTable: {
            "Dynamic Developers": 92,
            "The Trailblazers": 87,
            "Team Phoenix": 85,
            "The Innovators": 80,
            "The Mavericks": 75,
            "Code Crusaders": 70,
            "Creative Thinkers": 66,
            "The Problem Solvers": 62,
        },
    },
    {
        week: "Week 3",
        activity: "Trivia Challenge",
        date: "March 22, 2025",
        conductingTeam: "The Thinkers",
        winner: "The Innovators",
        description: "A fun trivia contest covering general knowledge, tech, and company facts!",
        pointsTable: {
            "The Innovators": 98,
            "Team Phoenix": 92,
            "The Trailblazers": 88,
            "Dynamic Developers": 84,
            "The Mavericks": 78,
            "Code Crusaders": 74,
            "Creative Thinkers": 70,
            "The Problem Solvers": 66,
        },
    },
    {
        week: "Week 4",
        activity: "Karaoke Battle",
        date: "March 29, 2025",
        conductingTeam: "The Music Masters",
        winner: "Code Crusaders",
        description: "A hilarious night of karaoke battles and audience voting!",
        pointsTable: {
            "Code Crusaders": 97,
            "The Trailblazers": 90,
            "The Innovators": 88,
            "Team Phoenix": 84,
            "Dynamic Developers": 79,
            "The Mavericks": 75,
            "Creative Thinkers": 71,
            "The Problem Solvers": 67,
        },
    },
];

// Function to Calculate Aggregated Points
const calculateTotalPoints = (weeksData) => {
    const totalPoints = {};

    weeksData.forEach((week) => {
        Object.entries(week.pointsTable).forEach(([team, points]) => {
            totalPoints[team] = (totalPoints[team] || 0) + points;
        });
    });

    return Object.entries(totalPoints)
        .sort((a, b) => b[1] - a[1]) // Sort by highest points
        .map(([name, points], index) => ({ rank: index + 1, name, points }));
};

// FunFriday Component
const FunFriday = () => {
    const navigate = useNavigate();
    const [selectedWeek, setSelectedWeek] = useState(funFridayData.length - 1); // Default: Last week
    const data = funFridayData[selectedWeek];
    const aggregatedPointsTable = calculateTotalPoints(funFridayData.slice(0, selectedWeek + 1)); // Sum up points till selected week

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Week Selector */}
            <div className="mb-6 flex space-x-4 overflow-x-auto">
                {funFridayData.map((week, index) => (
                    <button
                        key={week.week}
                        className={`px-4 py-2 rounded-lg text-lg font-semibold ${selectedWeek === index
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                        }`}
                        onClick={() => setSelectedWeek(index)}
                    >
                        {week.week}
                    </button>
                ))}
            </div>

            {/* Activity Details */}
            <motion.div className="p-6 bg-white shadow-2xl rounded-2xl">
                <h1 className="text-3xl font-bold text-gray-800">{data.activity}</h1>
                <p className="text-gray-500 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" /> {data.date}
                </p>
                <p className="text-lg text-gray-600 flex items-center gap-2 mt-2">
                    <Users className="w-5 h-5 text-green-600" />
                    Conducted by: <span className="font-semibold text-gray-800">{data.conductingTeam}</span>
                </p>
            </motion.div>

            {/* Winner & Points Table */}
            <motion.div className="mt-6 p-6 bg-white shadow-lg rounded-2xl">
                <h2 className="text-2xl font-bold text-gray-800">Winner: {data.winner}</h2>
                <p className="text-gray-600 mt-2">{data.description}</p>

                {/* Points Table (Aggregated) */}
                <div className="mt-6">
                    <h3 className="text-2xl font-bold text-gray-800">Total Points Table (Till {data.week})</h3>
                    <table className="mt-4 w-full border-collapse shadow-md">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 text-left font-semibold">Rank</th>
                                <th className="p-3 text-left font-semibold">Team</th>
                                <th className="p-3 text-left font-semibold">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aggregatedPointsTable.map((team) => (
                                <tr key={team.name} className="border-b hover:bg-gray-100 transition">
                                    <td className="p-3 font-semibold">{team.rank}</td>
                                    <td className="p-3">{team.name}</td>
                                    <td className="p-3 font-semibold text-blue-600">{team.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Back Button */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition-all"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default FunFriday;
