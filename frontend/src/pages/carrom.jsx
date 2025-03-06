import { useNavigate } from "react-router-dom";

const categories = [
    { name: "Men's Singles", image: "/static/images/mensinglecar.webp" },
    { name: "Men's Doubles", image: "/static/images/mendoubcar.webp" },
    { name: "Women's Singles", image: "/static/images/womensinglecar.webp" },
    { name: "Women's Doubles", image: "/static/images/womendoubcar.webp" },
    { name: "Mixed Doubles", image: "/static/images/mixdoubcar.webp" },
];

const Carrom = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/carrom/${encodeURIComponent(category.name)}`);
    };

    return (
        <div className="p-8">
            <h1 className="text-black text-3xl font-bold text-center mb-6">Carrom</h1>
            <div className="flex flex-wrap justify-center items-center gap-6 p-4">
                {categories.map((category) => (
                    <div
                        key={category.name}
                        className="relative overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => handleCategoryClick(category)}
                    >
                        {/* Image Cover */}
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                        />

                        {/* Category Name Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <h2 className="text-white text-2xl font-semibold text-center group-hover:text-yellow-400 transition-colors duration-300">
                                {category.name}
                            </h2>
                        </div>
                    </div>
                ))}
            </div>

            {/* Back Button */}
            <button
                onClick={() => navigate("/scores")}
                className="mt-12 px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition-all"
            >
                Back
            </button>
        </div>
    );
};

export default Carrom;
