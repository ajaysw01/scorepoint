import React from 'react';
import { useNavigate } from 'react-router-dom';

const GeneralRules = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-black mb-8">General Instructions 📋</h1>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
        <div className="p-6">
          <div className="space-y-6 text-gray-700 text-lg text-left">
            {/* Productivity */}
            <div>
              <h3 className="text-xl font-semibold mb-2">🏆 Productivity:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>No productivity should be disturbed because of sports.</li>
                <li>Schedules will ensure minimal disturbance to the working environment.</li>
                <li>Only players should be present at the match location.</li>
                <li>Practice for indoor games should be done outside office hours or after the day's matches.</li>
              </ul>
            </div>

            {/* UK Management Visit */}
            <div>
              <h3 className="text-xl font-semibold mb-2">🇬🇧 UK Management Visit:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Matches will continue as usual, maintaining office decorum.</li>
                <li>Any schedule changes will be communicated by Team Celeb.</li>
              </ul>
            </div>

            {/* Participation */}
            <div>
              <h3 className="text-xl font-semibold mb-2">🤝 Participation:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>One person can participate in:</li>
                <ul className="list-disc pl-10">
                  <li>Table Tennis: Up to 2 categories.</li>
                  <li>Carroms: All categories.</li>
                  <li>Badminton: Up to 2 categories.</li>
                </ul>
                <li>Teams can reschedule indoor games (TT, Carrom) up to 5 times.</li>
                <li>No swapping of doubles players — if one is unavailable, the opponent gets a bye.</li>
                <li>New joiners can only replace dummies in indoor games.</li>
              </ul>
            </div>

            {/* Slots */}
            <div>
              <h3 className="text-xl font-semibold mb-2">⏲️ Slots:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Each day will have:</li>
                <ul className="list-disc pl-10">
                  <li>5 TT matches</li>
                  <li>10 Carrom matches</li>
                </ul>
                <li>Slots displayed weekly on the website.</li>
              </ul>
            </div>

            {/* Tournaments */}
            <div>
              <h3 className="text-xl font-semibold mb-2">🏅 Tournaments:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Rules for each tournament will be shared separately.</li>
                <li>Injuries during matches result in a bye for the opponent — no rescheduling.</li>
              </ul>
            </div>

            {/* Scores */}
            <div>
              <h3 className="text-xl font-semibold mb-2">📊 Scores:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>No participation points — only winning points.</li>
                <li>Indoor game points are given level-wise:</li>
                <ul className="list-disc pl-10">
                  <li>Level 1 Win: 10 points</li>
                  <li>Level 2 Win: 20 points</li>
                </ul>
                <li>Bonus points:</li>
                <ul className="list-disc pl-10">
                  <li>TT/Badminton/Carroms: Winners: 250pts, Runners-up: 150pts</li>
                  <li>Cricket: Knockouts: 100pts, Semis: 150pts, Finals: Winners: 350pts, Runners-up: 175pts</li>
                  <li>Darts: Knockouts: 50pts, Semis: 50pts, Finals: Winners: 200pts, Runners-up: 100pts</li>
                </ul>
              </ul>
            </div>
          </div>
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

export default GeneralRules;
