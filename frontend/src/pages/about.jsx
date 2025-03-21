import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    src: "/assets/images/e491cb10-1d40-4abf-a5b6-7a68f905b50b.jpg",
    caption: "Annual Day-2024",
  },
  { src: "/assets/images/interns.jpg", caption: "Celebrelite Team-2025" },
  { src: "/assets/images/IMG_0241.JPG", caption: "Fun Friday Activities" },
  { src: "/assets/images/IMG_0496.JPG", caption: "Cricket Tournament-2024" },
  { src: "/assets/images/IMG_0620.JPG", caption: "Cricket Tournament-2024" },
  { src: "/assets/images/IMG_3092.JPG", caption: "Annual Day Evening-2024" },
  { src: "/assets/images/IMG_4572.JPG", caption: "Diwali-2024" },
  { src: "/assets/images/IMG_4664.JPG", caption: "Secret Santa-2024" },
  { src: "/assets/images/IMG_4679.JPG", caption: "Christmas-2024" },
  { src: "/assets/images/IMG_4682 (1).JPG", caption: "Christmas-2024" },
];

export default function About() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black px-4 py-10">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-blue-600">
        About Creditsafe Technology
      </h1>

      {/* Image Slideshow with Increased Size */}
      <div className="relative w-full max-w-4xl h-72 md:h-96 lg:h-[450px] overflow-hidden rounded-3xl shadow-lg">
        <AnimatePresence>
          <motion.img
            key={images[index].src}
            src={images[index].src}
            alt="About Image"
            className="absolute w-full h-full object-cover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        {/* Caption Overlay Without Background */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white text-xl md:text-2xl font-bold drop-shadow-lg">
          {images[index].caption}
        </div>
      </div>

      {/* Description Section */}
      <div className="max-w-3xl text-base md:text-lg text-center mt-8 space-y-6 leading-relaxed px-4">
        <p>
          At{" "}
          <span className="font-semibold text-blue-600">
            Creditsafe Technology
          </span>
          , we believe that a thriving workplace goes beyond just meeting
          deadlines and achieving business goals. We are committed to fostering
          a culture that promotes work-life balance, teamwork, and employee
          well-being through engaging activities that bring our people together.
        </p>

        <p>
          Our workplace is more than just a place to work—it’s a{" "}
          <span className="font-semibold text-blue-600">community</span>. We
          actively encourage cross-team engagement through a variety of exciting
          initiatives that allow employees to connect, collaborate, and
          celebrate. From high-energy sports events to vibrant festival
          celebrations, and from our much-anticipated Friday Fun activities to
          other interactive engagement programs, we create opportunities for our
          employees to unwind, bond, and build strong relationships beyond their
          day-to-day roles.
        </p>

        <p>
          Our flagship event, the{" "}
          <span className="font-semibold text-blue-600">
            Annual Sports Event
          </span>
          , is the highlight of our engagement calendar. It brings employees
          together in the spirit of teamwork, competition, and camaraderie,
          reinforcing our belief that a healthy and active lifestyle contributes
          to professional excellence. This event is organized by our club{" "}
          <span className="font-semibold text-blue-600">Celebrelite</span>.
        </p>

        <p className="font-semibold text-lg">
          At Creditsafe Technology, we don’t just work together—we{" "}
          <span className="text-blue-600">grow, celebrate, and succeed</span>{" "}
          together. Because when our employees thrive, so does our company.
        </p>

        <p className="text-xl font-bold text-blue-600">
          Join us in building a workplace that values balance, teamwork, and
          shared success!
        </p>
      </div>
    </div>
  );
}
