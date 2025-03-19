import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Men's Singles",
    apiValue: "men_singles",
    image: "/static/images/mensinglett.webp",
  },
  {
    name: "Men's Doubles",
    apiValue: "men_doubles",
    image: "/static/images/mendoubtt.webp",
  },
  {
    name: "Women's Singles",
    apiValue: "women_singles",
    image: "/static/images/womensinglett.webp",
  },
  {
    name: "Women's Doubles",
    apiValue: "women_doubles",
    image: "/static/images/womendoubtt.webp",
  },
  {
    name: "Mixed Doubles",
    apiValue: "mixed_doubles",
    image: "/static/images/mixdoubtt.webp",
  },
];

const TableTennis = () => {
  const navigate = useNavigate();
  const sport_id = 2;
  const game_name = "Table Tennis";

  const handleCategoryClick = (category) => {
    navigate(`/${game_name}/${sport_id}/${category.apiValue}`);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      {/* Title */}
      <h1 className="text-black text-4xl font-bold text-center mb-8">
        Table Tennis
      </h1>

      {/* Categories */}
      <div className="flex flex-wrap justify-center items-center gap-6 p-4">
        {categories.map((category) => (
          <div
            key={category.apiValue}
            className="relative overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer group"
            onClick={() => handleCategoryClick(category)}
          >
            {/* Image */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full max-w-[18rem] h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Category Name */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <h2 className="text-white text-2xl font-semibold text-center group-hover:text-yellow-400 transition-colors duration-300">
                {category.name}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => navigate("/scores")}
          className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition-all cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TableTennis;
