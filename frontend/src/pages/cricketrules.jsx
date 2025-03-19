import React from 'react';
import { useNavigate } from 'react-router-dom';

const cricketRules = [
    "Each team should consist of 11 players.",
    "Overs: Each side gets to bat and bowl for 10 overs each:\n - 3 overs PowerPlay – only 2 players allowed outside 30 yards circle.\n - Bowling Format: 3 overs – 2 Bowlers max.",
    "Bowler should notify the bowling side (round the wicket or over the wicket) to the umpire; if not followed, the ball is considered a no-ball.",
    "Fielding rules: Max 5 players on the leg side. If not followed, the ball is considered a no-ball. Outside 30 yards circle, 5 players max.",
    "Batting side is changed after 5 overs. The batting team can decide the side of batting.",
    "Only 2 max substitutes per match are allowed for fielding, and a substitute player has a limit of 4 overs.",
    "Only standard bowling will be allowed for Men (No throw bowling). If a bowler is attempting to throw the ball, the batter can appeal for a check. The check is done by the umpire for 2 balls. If the bowler is unable to bowl correctly, the over is discontinued, and runs are added.",
    "Only one Drinks Break and Strategic Timeout is allowed per innings (Between Overs 4-7) Duration: 5 min Exact.",
    "No Balls and Wides, Overthrows, Free Hits: Standard cricket rules regarding no balls (overstepping, height above the waist, etc.), wides (delivery outside the reach of the wide line or batsman), overthrows, and Free Hits apply.",
    "If rain interrupts the match at any point, the match will resume once the rain stops, regardless of whether it occurs during the first innings or after five overs.",
    "Umpire decisions will be the final call. No arguing with the umpire; only team captains are allowed to converse with the umpire.",
    "If any player/captain tries to influence or argue with the umpire/opponent team without a valid point, that player will be disqualified from the remaining Annual Sports events.",
];

const CricketRules = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
            {/* Header */}
            <h1 className="text-4xl font-bold text-center text-black mb-8">Cricket Rules 🏏</h1>

            {/* Rules Card */}
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-red-500">Rules and Regulations</h2>
                    <ul className="list-none list-inside space-y-4 text-gray-700 text-lg text-left">
                        {cricketRules.map((rule, index) => (
                            <li key={index} className="whitespace-pre-wrap">
                                <span className="font-bold">{index + 1}.</span> {rule}
                            </li>
                        ))}
                    </ul>


                </div>
            </div>

            {/* Back Button */}
            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => navigate("/rules")}
                    className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition-all cursor-pointer"
                >
                    Back to Rules
                </button>
            </div>
        </div>
    );
};

export default CricketRules;
