import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure useNavigate is imported
import { ChevronDown, ChevronUp } from "lucide-react"; // Import arrow icons

const dartsData = [
    {
        team: "Hogwarts Heros",
        teamScore: 450,
        players: [
            { name: "Harry Potter", score: 150 },
            { name: "Ron Weasley", score: 120 },
            { name: "Hermione Granger", score: 180 },
        ],
    },
    {
        team: "Order Of the Phoenix",
        teamScore: 420,
        players: [
            { name: "Albus Dumbledore", score: 160 },
            { name: "Sirius Black", score: 130 },
            { name: "Remus Lupin", score: 130 },
        ],
    },
    {
        team: "The Giants",
        teamScore: 380,
        players: [
            { name: "Grawp", score: 170 },
            { name: "Hagrid", score: 140 },
            { name: "Norbert", score: 70 },
        ],
    },
    {
        team: "Ravenclaws",
        teamScore: 410,
        players: [
            { name: "Luna Lovegood", score: 140 },
            { name: "Cho Chang", score: 130 },
            { name: "Padma Patil", score: 140 },
        ],
    },
    {
        team: "Gryffindors",
        teamScore: 440,
        players: [
            { name: "Neville Longbottom", score: 150 },
            { name: "Dean Thomas", score: 140 },
            { name: "Seamus Finnigan", score: 150 },
        ],
    },
    {
        team: "Dark Wizards",
        teamScore: 400,
        players: [
            { name: "Voldemort", score: 200 },
            { name: "Bellatrix Lestrange", score: 100 },
            { name: "Lucius Malfoy", score: 100 },
        ],
    },
    {
        team: "The Goblins",
        teamScore: 390,
        players: [
            { name: "Griphook", score: 130 },
            { name: "Bogrod", score: 130 },
            { name: "Ragnok", score: 130 },
        ],
    },
    {
        team: "The Dragons",
        teamScore: 430,
        players: [
            { name: "Norberta", score: 170 },
            { name: "Hungarian Horntail", score: 150 },
            { name: "Swedish Short-Snout", score: 110 },
        ],
    },
];

const Darts = () => {
    const [openTeam, setOpenTeam] = useState(null);
    const navigate = useNavigate(); // Use navigate hook for navigation

    const toggleDropdown = (teamName) => {
        setOpenTeam(openTeam === teamName ? null : teamName);
    };

    return (
        <div className="p-8 min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Darts Scores</h1>
            <div className="max-w-4xl mx-auto space-y-6">
                {dartsData.map((team) => (
                    <div key={team.team} className="bg-white shadow-lg rounded-lg p-6">
                        {/* Team Score Card with Dropdown Arrow */}
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => toggleDropdown(team.team)}
                        >
                            <h2 className="text-2xl font-semibold">{team.team}</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-green-600">{team.teamScore} pts</span>
                                {/* Dynamic Arrow Icon */}
                                {openTeam === team.team ? (
                                    <ChevronUp className="text-gray-600 transition-transform duration-300" />
                                ) : (
                                    <ChevronDown className="text-gray-600 transition-transform duration-300" />
                                )}
                            </div>
                        </div>

                        {/* Dropdown for Player Scores */}
                        {openTeam === team.team && (
                            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">Player Scores</h3>
                                <ul className="space-y-2">
                                    {team.players.map((player, index) => (
                                        <li key={index} className="flex justify-between bg-white p-2 rounded-md shadow-sm">
                                            <span>{player.name}</span>
                                            <span className="font-bold text-blue-600">{player.score} pts</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Added Spacing Above Button */}
            <div className="mt-12 flex justify-center">
            <button
    onClick={() => navigate("/scores")}
    className="mt-12 px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition-all"
>
    Back
</button>
            </div>
        </div>
    );
};

export default Darts;
