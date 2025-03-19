import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const tableTennisRules = {
  "Table Tennis Single’s Rules": [
  { type: "rule", text: "1. Scoring and Game Format" },
  "• Games are played to either 11 or 21 points, as mutually agreed upon by the players.",
  "• A game must be won by a margin of two points.",
  "• Typically, a match consists of the best two out of three games.",
  { type: "rule", text: "2. Serve and Service Alternation" },
  "• The serve alternates every two points.",
  "• When the score reaches 10-10 or 20-20, known as 'deuce,' the service alternates after each point.",
  { type: "rule", text: "3. Serving Technique" },
  "• When serving, the player must toss the ball straight up from an open palm, behind their end of the table.",
  "• The ball must be tossed at least 6 inches high and struck on its way down.",
  "• The serve should first hit the server's side of the table and then the opponent's side.",
  "• Once the ball leaves the server's hand, it is considered in play, and if the receiver misses or miss-hits it, the server earns the point.",
  { type: "rule", text: "4. Singles Serve Placement" },
  "• There are no restrictions on where the serve lands in singles.",
  "• The ball can land anywhere on the server's side or the opponent's side of the table.",
  "• It can bounce multiple times on the opponent's side, go over the side, or even hit the edge.",
  { type: "rule", text: "5. 'Let' Serves" },
  "• If the serve touches the net on its way over but is otherwise a legitimate hit, it is considered a 'let' serve.",
  "• In this case, the serve is replayed, and there is no limit to the number of 'let' serves.",
  { type: "rule", text: "6. Volleys and Valid Shots" },
  "• Volleys, hitting the ball before it bounces on your side of the table, are not allowed and result in a point for the opponent.",
  "• If your opponent's shot goes over your end of the table without touching it and hits you or your paddle, it is still your point.",
  "• If your hit in a rally or on a serve causes the ball to bounce back over the net after hitting your opponent's side of the table without your opponent touching it, it is your point.",
  { type: "rule", text: "7. Legal Touches and Violations" },
  "• It is allowed to touch the ball with your paddle hand, including all fingers and the hand area below the wrist.",
  "• If the ball touches your paddle hand and results in a legal hit, there is no rule violation, and play continues.",
  "• However, touching the ball with any other part of your body or your non-paddle hand during a rally results in a point for the opponent.",
  "• If your opponent's shot goes over your side of the table without touching it and hits any part of you or your paddle, it is still your point.",
  { type: "rule", text: "8. Table Touching Restrictions" },
  "• You are not allowed to touch the table with your non-paddle hand during play.",
  "• However, you can touch the ball or the table with your paddle hand or other parts of your body.",
  "• If the table moves due to your touching it during a rally, your opponent earns the point.",
  { type: "rule", text: "9. Edge Balls and Valid Hits" },
  "• An 'edge' ball refers to a serve or hit that contacts the top edge of the horizontal table top surface.",
  "• Even if it bounces sideways, it is considered a valid hit.",
  "• The vertical sides of the table are not part of the legal playing surface.",
  { type: "rule", text: "10. Fair Play and Disputed Calls" },
  "• In the absence of a referee, the 'honor system' applies if players disagree on a certain call.",
  "• Players should find a way to agree or replay the point.",
  "• Table tennis values fair play, and players are encouraged to uphold",
  ],
  "Table Tennis Double’s Rules": [
  { type: "rule", text: "1. Scoring and Match Structure:" },
  "• Games in table tennis are played until one player/team reaches 21 points.",
  "• To win a game, a player/team must have a lead of at least two points.",
  "• A match typically consists of the best two out of three games.",
  { type: "rule", text: "2. Serving and Service Alternation:" },
  "• Each side of the table takes turns serving every five points.",
  "• When the score reaches 20-20 ('deuce'), the service alternates after each point.",
  "• It is possible to lose a point when serving in table tennis.",
  { type: "rule", text: "3. Serving Rules:" },
  "• When serving, the player must toss the ball straight up at least 6 inches from an open palm behind the end of the table.",
  "• The server strikes the ball on its way down, and it must first hit their side of the table and then the opponent's side.",
  "• Once the ball leaves the server's hand, it is considered in play, and if the receiver misses or mishits it, the receiver loses the point.",
  { type: "rule", text: "4. Doubles Serving Rules:" },
  "• In doubles, the serve must bounce in the server's right court and the receiver's right court.",
  "• The ball can land on the center line and still be considered a fair serve.",
  "• Doubles partners switch positions after serving twice.",
  { type: "rule", text: "5. 'Let' Serves:" },
  "• If the served ball touches the net and otherwise legally bounces in play, it is called a 'let' serve and is redone.",
  "• There is no limit on the number of times a 'let' serve can happen.",
  { type: "rule", text: "6. Doubles Rally Rules:" },
  "• In a doubles rally, partners must take turns hitting the ball, regardless of where it lands on the table.",
  { type: "rule", text: "7. Volleys and Bouncing Rule:" },
  "• Volleys, hitting the ball before it bounces on your side, are not allowed in table tennis.",
  "• Hitting the ball before it bounces results in a point for the opponent.",
  "• If the ball goes over your end of the table without touching it and then hits you or your paddle, it is also your opponent's point.",
  { type: "rule", text: "8. Legal Hits and Restrictions:" },
  "• During a rally, you are allowed to touch the ball with your paddle hand, including all fingers and the area below the wrist, as long as it is a legal hit.",
  "• However, using your non-paddle hand to touch the ball will result in a point for your opponent.",
  "• If your opponent's shot goes over your side without touching the table and hits you or your paddle, it is still your point.",
  { type: "rule", text: "9. Touching the Table and 'Edge' Balls:" },
  "• You are permitted to touch the ball or the table with your paddle hand or other parts of your body",
  "• Touching the table with your non-paddle hand during a rally gives a point to your opponent.",
  "• An 'edge' ball, which contacts the top edge of the horizontal table surface, is considered valid as long as it is a legal serve or hit. The vertical sides of the table are not included in the playing surface.",
  { type: "rule", text: "10. Fair Play and Disputes:" },
  "• In the absence of a referee, players are expected to adhere to the 'honor system' when disagreements arise.",
  "• It is encouraged to find a resolution or replay the point.",
  "• Table tennis promotes competitive but fair play, and players are urged to maintain this tradition",
  ],
};

const TableTennisRules = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("Table Tennis Single’s Rules");
  
    return (
      <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-black mb-8">Table Tennis Rules 🏓</h1>
  
        {/* Dropdown */}
        <div className="max-w-md mx-auto mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {Object.keys(tableTennisRules).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
  
        {/* Rules Card */}
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Rules and Regulations</h2>
            <ul className="list-none list-inside space-y-4 text-gray-700 text-lg text-left">
              {tableTennisRules[selectedCategory].map((rule, index) => (
                <li key={index} className="whitespace-pre-wrap">
                  {rule.type === 'rule' ? (
                    <span className="font-bold">{rule.text}</span>
                  ) : (
                    <span>{rule}</span>
                  )}
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
  
  export default TableTennisRules;
