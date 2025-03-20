import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ children, className = "" }) => {
    return <div className={`bg-white shadow-lg rounded-lg p-4 ${className}`}>{children}</div>;
};

const Cricket = () => {
    const navigate = useNavigate();

    const [pointsTable, setPointsTable] = useState({
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
    });

    useEffect(() => {
        const sportId = 1; // Cricket ID
        const category = "none";

        fetch(`http://18.201.173.70/api/points/players/${sportId}/${category}`)
            .then(response => response.json())
            .then(data => {
                const teamPoints = {};
                const playerZeroPoints = {}; // Track if any player has 0 points

                data.forEach(player => {
                    if (!teamPoints[player.team_name]) {
                        teamPoints[player.team_name] = { total_points: 0 };
                        playerZeroPoints[player.team_name] = false; // Initialize as false
                    }
                    teamPoints[player.team_name].total_points += player.total_points;

                    // If any player has 0 points, mark the team
                    if (player.total_points === 0) {
                        playerZeroPoints[player.team_name] = true;
                    }
                });

                setPointsTable(prevPointsTable => {
                    const updatedPointsTable = { ...prevPointsTable };

                    Object.entries(updatedPointsTable).forEach(([group, teams]) => {
                        updatedPointsTable[group] = teams.map(team => {
                            const totalPoints = teamPoints[team.team]?.total_points || 0;
                            const won = Math.floor(totalPoints / 100);
                            const played = won > 0 ? won + 1 : 0;
                            let lost = played - won;

                            // If any player in the team has 0 points, increase lost by 1
                            if (playerZeroPoints[team.team]) {
                                lost += 1;
                            }

                            return {
                                ...team,
                                played,
                                won,
                                lost,
                            };
                        });
                    });

                    return updatedPointsTable;
                });
            })
            .catch(error => console.error("Error fetching points:", error));
    }, []);

    const groupMatches = {
        A: [
            { date: "2025-03-22", time: "07:30 AM", venue: "AM Cricket Ground, Hyderabad", team1: "The Giants", team2: "Hogwarts Heros", status: "Completed", link: "https://cricheroes.in/scorecard/15847826/Creditsafe-2k25/The-Giants-vs-Hogwarts-Heros" },
            { date: "2025-03-22", time: "09:30 AM", venue: "AM Cricket Ground, Hyderabad", team1: "Ravenclaws", team2: "Order Of the Phoenix", status: "Completed", link: "https://cricheroes.in/scorecard/15847837/Creditsafe-2k25/Ravenclaws-vs-Order-Of-the-Phoenix" },
            { date: "2025-03-22", time: "01:00 PM", venue: "AM Cricket Ground, Hyderabad", team1: "Hogwarts Heros", team2: "Order Of the Phoenix", status: "Completed", link: "https://cricheroes.in/scorecard/15847846/Creditsafe-2k25/Hogwarts-Heros-vs-Order-Of-the-Phoenix" },
            { date: "2025-03-22", time: "02:30 PM", venue: "AM Cricket Ground, Hyderabad", team1: "The Giants", team2: "Ravenclaws", status: "Completed", link: "https://cricheroes.in/scorecard/15847859/Creditsafe-2k25/The-Giants-vs-Ravenclaws" }
        ],
        B: [
            { date: "2025-03-23", time: "07:30 AM", venue: "AM Cricket Ground, Hyderabad", team1: "Gryffindors", team2: "The Goblins", status: "Completed", link: "https://cricheroes.in/scorecard/15847878/Creditsafe-2k25/Gryffindors-vs-The-Goblins" },
            { date: "2025-03-23", time: "09:30 AM", venue: "AM Cricket Ground, Hyderabad", team1: "The Dragons", team2: "Dark Wizards", status: "Completed", link: "https://cricheroes.in/scorecard/15847884/Creditsafe-2k25/The-Dragons-vs-Dark-Wizards" },
            { date: "2025-03-23", time: "01:00 PM", venue: "AM Cricket Ground, Hyderabad", team1: "The Dragons", team2: "The Goblins", status: "Completed", link: "https://cricheroes.in/scorecard/15847917/Creditsafe-2k25/The-Dragons-vs-The-Goblins" },
            { date: "2025-03-23", time: "02:30 PM", venue: "AM Cricket Ground, Hyderabad", team1: "Gryffindors", team2: "Dark Wizards", status: "Completed", link: "https://cricheroes.in/scorecard/15847938/Creditsafe-2k25/Gryffindors-vs-Dark-Wizards" }
        ],
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Points Table */}
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {teams.map((team, index) => (
                                        <tr key={index} className="text-center odd:bg-gray-100 even:bg-white">
                                            <td className="p-3 font-semibold">{team.team}</td>
                                            <td className="p-3">{team.played}</td>
                                            <td className="p-3">{team.won}</td>
                                            <td className="p-3">{team.lost}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Match Schedules */}
            <Card>
                <h2 className="text-2xl font-bold mb-4 text-center">Matches</h2>
                {Object.entries(groupMatches).map(([group, matches]) => (
                    <div key={group} className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 text-center">Group {group}</h3>
                        <div className="space-y-4">
                            {matches.map((match, index) => (
                                <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
                                    <p className="text-lg font-semibold">
                                        {match.team1} vs {match.team2}
                                    </p>
                                    <p className="text-gray-700">{match.date} | {match.time} | {match.venue}</p>
                                    <a href={match.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Scorecard</a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </Card>

            <button onClick={() => navigate("/scores")} className="mt-12 px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition-all">
                Back
            </button>
        </div>
    );
};

export default Cricket;
