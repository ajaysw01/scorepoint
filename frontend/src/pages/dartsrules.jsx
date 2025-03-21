import dartsImage from "/assets/images/dartsrules.jpg";
import { useNavigate } from "react-router-dom";

const DartsRules = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
        Darts Rules
      </h1>

      {/* Darts Image Card */}
      <div className="w-full max-w-4xl flex justify-center">
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow">
          {/* Small Text */}
          <div className="text-center text-lg font-semibold text-gray-700 p-4">
            Scoring
          </div>

          {/* Image */}
          <img
            src={dartsImage}
            alt="Darts"
            className="w-full h-auto object-cover border-t border-b"
          />

          {/* Note */}
          <div className="text-center text-sm text-gray-500 p-4 italic">
            Note: Remaining rules will be updated soon
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/rules")}
        className="mt-8 px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition-all cursor-pointer"
      >
        Back to Rules
      </button>
    </div>
  );
};

export default DartsRules;
