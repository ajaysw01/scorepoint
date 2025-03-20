import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const badmintonRules = {
  "Basic Instructions": [
    "1. A game shall be won by the side which scores 21 points first.",
    "2. All matches until semifinal are knockouts.",
    "3. Semi Finals:",
    "   • A match shall consist of the best of three games.",
    "   • A game shall be won by the side which scores the first 11 points.",
    "4. The final will be played best of three with 21 points to win.",
    {
      type: "note",
      text: "No inventory will be provided except for shuttlecocks. So, please arrange your own shoes and rackets.",
    },
  ],
  "Game Rules": [
    "1. A player must wait until his opponent is ready before serving. If the opponent attempts a return, then he/she is ruled having been ready.",
    "2. The feet of both players must remain in a stationary position until the serve is made. Your feet cannot be touching the line at this time.",
    "3. It is not a fault if you miss the shuttle while serving.",
    "4. The shuttle cannot be caught and slung with the racket.",
    "5. A player cannot hold his racket near the net to ward off a downward stroke by his opponent or to interfere with his racket.",
    "6. If a player gets injured, then the opponent will be given a bye.",
  ],
  Singles: [
    "1. At the beginning of the game (0-0) and when the server’s score is even, the server serves from the right service court. When the server’s score is odd, the server serves from the left service court.",
    "2. If the server wins a rally, the server scores a point and then serves again from the alternate service court.",
    "3. If the receiver wins a rally, the receiver scores a point and becomes the new server. They serve from the appropriate service court – left if their score is odd, and right if it is even.",
  ],
  Doubles: [
    "1. The service passes consecutively to the players standing diagonal to them.",
    "2. At the beginning of the game and when the score is even, the server serves from the right service court. When it is odd, the server serves from the left court.",
    "3. If the serving side wins a rally, the serving side scores a point, and the same server serves again from the alternate service court.",
    "4. If the receiving side wins a rally, the receiving side scores a point. The receiving side becomes the new serving side.",
    "5. The players do not change their respective service courts until they win a point when their side is serving.",
  ],
  Faults: [
    "1. The shuttle does not land in the correct service court.",
    "2. The server's feet are not in the service court or if the feet of the receiver are not in the court diagonally opposite the server.",
    "3. The server steps forward as he/she serves.",
    "4. Any player balking or feinting his opponent before serve or during serve.",
    "5. A serve or shot that lands outside the court boundaries, passes under or through the net, touches any other obstructions or a player’s body or clothing. The boundary and service lines are considered in play.",
    "6. The shuttle in play is struck before it crosses the net to the striker's side of the net. You may follow through over the net.",
    "7. A player touching the net or its supports with his body or racket while the shuttle is in play.",
    "8. Hitting the shuttle twice in succession by a player or team.",
  ],
};

const BadmintonRules = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] =
    useState("Basic Instructions");

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-black mb-8">
        Badminton Rules 🏸
      </h1>

      {/* Dropdown */}
      <div className="max-w-md mx-auto mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {Object.keys(badmintonRules).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Rules Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-red-500">
            {selectedCategory}
          </h2>
          <ul className="list-none list-inside space-y-4 text-gray-700 text-lg text-left">
            {badmintonRules[selectedCategory].map((rule, index) => (
              <li key={index} className="whitespace-pre-wrap">
                {/* Note Section */}
                {typeof rule === "object" && rule.type === "note" ? (
                  <>
                    <span className="font-bold">Note:</span> {rule.text}
                  </>
                ) : (
                  <>
                    {/* Bold Numbers */}
                    {rule.match(/^\d+/) && (
                      <span className="font-bold">
                        {rule.split(". ")[0] + ". "}
                      </span>
                    )}
                    {/* Rule Text */}
                    {rule.replace(/^\d+\. /, "")}
                  </>
                )}
              </li>
            ))}
          </ul>

          {/* Court Image under Basic Instructions */}
          {selectedCategory === "Basic Instructions" && (
            <div className="flex justify-center mt-6">
              <img
                src="/assets/images/badminton-court.gif"
                alt="Badminton Court"
                className="w-full max-w-lg border border-gray-300 rounded-lg shadow-md"
              />
            </div>
          )}
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

export default BadmintonRules;
