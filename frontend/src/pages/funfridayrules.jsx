import React from 'react';
import { useNavigate } from 'react-router-dom';

const FunFridayRules = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-black mb-8">Fun Friday 🎉</h1>

      {/* Rules Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">No Activities Scheduled</h2>
          <p className="text-lg text-gray-700">
            Currently, there are no Fun Friday activities scheduled. Please stay tuned for upcoming events and activities.
          </p>
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

export default FunFridayRules;
