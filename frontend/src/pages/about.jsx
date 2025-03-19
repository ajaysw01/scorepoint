import { motion } from "framer-motion";

// Contributor Data
const contributors = [
  {
    name: "Manikanta Dangeti",
    role: "System Engineer Intern",
    contribution: "Ideation of the Website, FrontEnd structuring and development.",
    image: "/static/images/manikanta.jpg",
  },
  {
    name: "Ajay Wankhade",
    role: "System Engineer Intern",
    contribution: "Implemented the backend infrastructure, APIs, and database schema creation.",
    image: "/static/images/ajay.jpg",
  },
  {
    name: "Monesh Jangam",
    role: "Data Engineer Intern",
    contribution: "Developed the user interface and interactive features for the website.",
    image: "/static/images/monesh.jpg",
  },
  {
    name: "Mahesh Guguloth",
    role: "System Engineer Intern",
    contribution: "Contributed to front-end development and deployment of the website.",
    image: "/static/images/mahesh.jpg",
  },
];

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.h1
        className="text-4xl font-bold text-center text-gray-800 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Meet the Developers
      </motion.h1>

      {/* Contributors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {contributors.map((contributor, index) => (
          <motion.div
            key={index}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:scale-105 transition-transform cursor-pointer"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Contributor Image */}
            <div className="relative w-full h-72">
              <img
                src={contributor.image}
                alt={contributor.name}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

            {/* Name (Always Visible) */}
            <div className="absolute bottom-4 left-0 right-0 p-2 text-center text-white bg-black/40">
              <h2 className="text-lg font-bold">{contributor.name}</h2>
            </div>

            {/* Hover Effect for Details */}
            <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex flex-col justify-center items-center p-4 transition-opacity">
              <h2 className="text-xl font-bold text-white mb-2">{contributor.name}</h2>
              <p className="text-sm text-red-300">{contributor.role}</p>
              <p className="mt-2 text-sm text-gray-200 text-center">{contributor.contribution}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
