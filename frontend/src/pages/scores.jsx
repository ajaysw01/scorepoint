import { Link } from "react-router-dom";

const sports = [
    { name: "Badminton", image: "static/images/badminton.jpg", path: "/badminton" },
    { name: "Table Tennis", image: "static/images/tabletennis.jpg", path: "/tabletennis" },
    { name: "Carrom", image: "static/images/carrom.jpg", path: "/carrom" },
    { name: "Cricket", image: "static/images/cricket.jpg", path: "/Cricket/1/none" },
    { name: "Darts", image: "static/images/darts.jpg", path: "/Darts/6/none" },
    { name: "Fun Friday", image: "static/images/funfriday.png", path: "/Fun Friday/5/none" }, 
];

const Scores = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6 px-4 sm:px-6">
            <h1 className="text-4xl font-bold text-center text-Red-400 mb-8">Choose Your Sport</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {sports.map((sport) => (
                    <Link to={sport.path} key={sport.name} className="group" aria-label={`Go to ${sport.name}`}>

                    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
                        <img
                            src={sport.image}
                            alt={sport.name}
                            className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <h2 className="text-white text-3xl font-semibold text-center group-hover:text-yellow-400 transition-colors duration-300">
                                {sport.name}
                            </h2>
                        </div>
                    </div>
                </Link>
                
                ))}
            </div>
        </div>
    );
};

export default Scores;
