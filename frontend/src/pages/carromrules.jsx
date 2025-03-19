import React from 'react';
import { useNavigate } from 'react-router-dom';

const carromRules = {
  "Basic Rules": [
    "Whoever strikes first, or breaks, is always white.",
    "When placing the striker on the board to shoot, the striker must touch both bases.",
    "Lines, either covering the red circle completely or not touching it at all. The striker may not touch the diagonal arrow line.",
    "Shooting styles are very personal—whichever grip works for you is fine until you don't push it.",
    "Players should not move or leave their chair.",
  ],
  "Main Rules": [
    "Only one knockout game will be played for deciding the winner until the Semi-Finals. For the Semi-Finals and Finals, the best of three games will be played.",
    "Sinking the striker in a pocket costs you one piece and your turn.",
    "If while shooting for the queen you also sink one of your pieces, the queen is automatically covered, no matter which went first.",
    "If a piece jumps off the board, it is placed on the center spot. If pieces land on end or are overlapping, they are left that way.",
    "If the center spot is partially covered when replacing the queen or a jumped piece, the piece should cover as much red as possible. If totally covered, the piece is placed opposite the next player behind the red spot.",
    "If you hit your opponent's last piece directly, it will cost you a piece.",
    "If you sink your opponent's piece, you lose your turn. If you sink their last piece, you lose the board and game.",
    "If you sink your last piece before the queen, you lose the board, and the game will be to the opponent's winning.",
  ],
  "Red / Queen Rules": [
    "The red piece, or 'queen,' can be pocketed at any time after sinking your first piece but must be sunk before your last one.",
    "After pocketing the queen, you must sink one of your pieces only, thereby 'covering' it, into any pocket in the next shot, or the queen will be returned to the center spot.",
    "Once the queen is covered, whoever clears all their pieces first wins the board.",
  ],
  "Fouls": [
    "When the striker is pocketed, a penalty piece is returned to the center of the board.",
  ],
  "New Rules for This Year": [
    "If only two pieces remain—one yours and one your opponent’s—and both are sunk simultaneously, the player whose piece is pocketed first wins.",
    "If the queen and your last coin are on the board and you hit your last coin directly, you must keep an extra piece as a fine and lose your turn.",
    "If the queen and striker are sunk simultaneously, you must keep a fine but do not lose your turn.",
    "If you sink the queen along with your opponent’s piece in the same shot or in the next turn, you lose your turn, and the queen will be pocketed.",
    "If you hit the queen and sink the striker in the next turn, you lose your turn and must keep a fine.",
    "If you sink both your piece and your opponent’s piece simultaneously, you do not lose your turn.",
    "If you sink a piece along with the striker, then the piece should be returned to the board, and you cannot strike again.",
  ],
};

const CarromRules = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-black mb-8">Carrom Rules</h1>

      {/* Rules Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Rules and Regulations</h2>
          {Object.entries(carromRules).map(([section, rules]) => (
            <div key={section} className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{section}</h3>
              <ul className="list-none list-inside space-y-4 text-gray-700 text-lg text-left">
                {rules.map((rule, index) => (
                  <li key={index} className="whitespace-pre-wrap">
                    <span className="font-bold">{index + 1}.</span> {rule}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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

export default CarromRules;
