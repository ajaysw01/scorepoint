import React from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate

const Card = ({ children, className = "" }) => {
    return (
        <div className={`bg-white shadow-lg rounded-lg p-4 ${className}`}>
            {children}
        </div>
    );
};

const Cricket = () => {
    const navigate = useNavigate(); // ✅ Initialize navigate function

    const pointsTable = {
        A: [
            { team: "Hogwarts Heros", played: 0, won: 0, lost: 0, nrr: "0.0" },
            { team: "Order Of the Phoenix", played: 0, won: 0, lost: 0, nrr: "0.0" },
            { team: "The Giants", played: 0, won: 0, lost: 0, nrr: "0.0" },
            { team: "Ravenclaws", played: 0, won: 0, lost: 0, nrr: "0.0" },
        ],
        B: [
            { team: "Gryffindors", played: 0, won: 0, lost: 0, nrr: "0.0" },
            { team: "Dark Wizards", played: 0, won: 0, lost: 0, nrr: "0.0" },
            { team: "The Goblins", played: 0, won: 0, lost: 0, nrr: "0.0" },
            { team: "The Dragons", played: 0, won: 0, lost: 0, nrr: "0.0" },
        ],
    };

    const groupMatches = {
        A: [
            { date: "2025-03-22", time: "07:30 AM", venue: "AM Cricket Ground, Hyderabad", team1: "Hogwarts Heros", team2: "Order Of the Phoenix", score: "UPCOMING", result: "Match Scheduled" },
            { date: "2025-03-22", time: "09:30 AM", venue: "AM Cricket Ground, Hyderabad", team1: "The Giants", team2: "Ravenclaws", score: "UPCOMING", result: "Match Scheduled" },
            { date: "2025-03-22", time: "12:30 PM", venue: "AM Cricket Ground, Hyderabad", team1: "Hogwarts Heros", team2: "The Giants", score: "UPCOMING", result: "Match Scheduled" },
            { date: "2025-03-22", time: "02:30 PM", venue: "AM Cricket Ground, Hyderabad", team1: "Order Of the Phoenix", team2: "Ravenclaws", score: "UPCOMING", result: "Match Scheduled" }
        ],
        B: [
            { date: "2025-03-23", time: "07:30 AM", venue: "AM Cricket Ground, Hyderabad", team1: "Gryffindors", team2: "The Goblins", score: "UPCOMING", result: "Match Scheduled" },
            { date: "2025-03-23", time: "09:30 AM", venue: "AM Cricket Ground, Hyderabad", team1: "The Dragons", team2: "Dark Wizards", score: "UPCOMING", result: "Match Scheduled" },
            { date: "2025-03-23", time: "12:30 PM", venue: "AM Cricket Ground, Hyderabad", team1: "Gryffindors", team2: "The Dragons", score: "UPCOMING", result: "Match Scheduled" },
            { date: "2025-03-23", time: "02:30 PM", venue: "AM Cricket Ground, Hyderabad", team1: "The Goblins", team2: "Dark Wizards", score: "UPCOMING", result: "Match Scheduled" },
        ],
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Card className="mb-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Points Table</h2>
                <div className="grid grid-cols-2 gap-8">
                    {Object.entries(pointsTable).map(([group, teams]) => (
                        <div key={group}>
                            <h3 className="text-xl font-semibold mb-2 text-center">Group {group}</h3>
                            <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th className="p-3">Team</th>
                                        <th className="p-3">Played</th>
                                        <th className="p-3">Won</th>
                                        <th className="p-3">Lost</th>
                                        <th className="p-3">NRR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teams.map((team, index) => (
                                        <tr key={index} className="text-center odd:bg-gray-100 even:bg-white">
                                            <td className="p-3 font-semibold">{team.team}</td>
                                            <td className="p-3">{team.played}</td>
                                            <td className="p-3">{team.won}</td>
                                            <td className="p-3">{team.lost}</td>
                                            <td className="p-3">{team.nrr}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </Card>

            <div className="grid grid-cols-2 gap-8 mb-6">
                {Object.entries(groupMatches).map(([group, matches]) => (
                    <Card key={group}>
                        <h2 className="text-2xl font-bold mb-4 text-center">Group {group} Matches</h2>
                        <div className="space-y-4">
                            {matches.map((match, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md">
                                    <p className="text-lg font-semibold text-center">{match.team1} vs {match.team2}</p>
                                    <p className="text-center text-gray-500">{match.date} | {match.time} | {match.venue}</p>
                                    <p className="text-center text-gray-600">{match.score}</p>
                                    <p className="text-center text-green-600 font-semibold">{match.result}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>

            {/* ✅ Back Button (Now Fixed) */}
            <button
    onClick={() => navigate("/scores")}
    className="mt-12 px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition-all"
>
    Back
</button>


        </div>
    );
};

export default Cricket;
