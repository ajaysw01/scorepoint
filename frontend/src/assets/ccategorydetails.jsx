import { useParams, useNavigate } from "react-router-dom";
import PlayerPointsTable from "./playerpoints";
import TeamPointsTable from "./teampointstable";
import MatchHistory from "./matchhistory";

// Sample data for each category
const categoryData = {
    "Men's Singles": {
        playerData: [
            { name: "Player A", points: 1600 },
            { name: "Player B", points: 1400 },
        ],
        teamData: [],
        matchData: [
            {
                matchId: "MS1",
                winner: "Player A",
                opponents: "Player A vs Player B",
                score: "21-18, 19-21, 21-17",
                date: "Feb 20, 2025",
                time: "5:00 PM",
                venue: "Court 1",
            },
        ],
    },
    "Men's Doubles": {
        playerData: [],
        teamData: [
            { name: "Team X", wins: 4, points: 3200 },
            { name: "Team Y", wins: 2, points: 2800 },
        ],
        matchData: [
            {
                matchId: "MD1",
                winner: "Team X",
                opponents: "Team X vs Team Y",
                score: "2-0",
                date: "Feb 21, 2025",
                time: "6:00 PM",
                venue: "Court 2",
            },
        ],
    },
    "Women's Singles": {
        playerData: [
            { name: "Player C", points: 1500 },
            { name: "Player D", points: 1350 },
        ],
        teamData: [],
        matchData: [
            {
                matchId: "WS1",
                winner: "Player C",
                opponents: "Player C vs Player D",
                score: "21-15, 21-18",
                date: "Feb 22, 2025",
                time: "4:30 PM",
                venue: "Court 3",
            },
        ],
    },
    "Women's Doubles": {
        playerData: [],
        teamData: [
            { name: "Team P", wins: 3, points: 3100 },
            { name: "Team Q", wins: 1, points: 2700 },
        ],
        matchData: [
            {
                matchId: "WD1",
                winner: "Team P",
                opponents: "Team P vs Team Q",
                score: "2-1",
                date: "Feb 23, 2025",
                time: "5:45 PM",
                venue: "Court 4",
            },
        ],
    },
    "Mixed Doubles": {
        playerData: [],
        teamData: [
            { name: "Team M", wins: 5, points: 3300 },
            { name: "Team N", wins: 4, points: 3150 },
        ],
        matchData: [
            {
                matchId: "MX1",
                winner: "Team M",
                opponents: "Team M vs Team N",
                score: "2-1",
                date: "Feb 24, 2025",
                time: "7:00 PM",
                venue: "Court 5",
            },
        ],
    },
};

const CCategoryDetails = () => {
    const { categoryName } = useParams();
    const navigate = useNavigate();

    const data = categoryData[categoryName] || { playerData: [], teamData: [], matchData: [] };

    return (
        <div className="p-8">
            <h1 className="text-black text-3xl font-bold text-center mb-6">{categoryName}</h1>
            <div className="mt-4 flex flex-wrap gap-6">
                {/* Player Points Table */}
                {data.playerData.length > 0 && (
                    <div className="flex-1 min-w-[300px] p-6 bg-white shadow-xl rounded-xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Player Points Table</h2>
                        <PlayerPointsTable data={data.playerData} />
                    </div>
                )}

                {/* Team Points Table */}
                {data.teamData.length > 0 && (
                    <div className="flex-1 min-w-[300px] p-6 bg-white shadow-xl rounded-xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Team Points Table</h2>
                        <TeamPointsTable data={data.teamData} />
                    </div>
                )}
            </div>

            {/* Match History */}
            {data.matchData.length > 0 && (
                <div className="mt-4 p-6 bg-white shadow-xl rounded-xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Match History</h2>
                    <MatchHistory data={data.matchData} />
                </div>
            )}

            <button
                onClick={() => navigate("/carrom")}
                className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
            >
                Back to Categories
            </button>
        </div>
    );
};

export default CCategoryDetails;
