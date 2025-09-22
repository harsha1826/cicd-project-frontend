import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import img1 from "../../assets/images/car.png"; // Dark theme image
import img2 from "../../assets/images/banner-car.png"; // Light theme image

const Hero = ({ theme }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/about"); // Navigate to About page
  };

  return (
    <div className="dark:bg-black dark:text-white duration-500 relative z-20">
      <div className="container min-h-[620px] flex items-center">
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Text Section */}
          <div className="order-2 sm:order-1 space-y-6 sm:pr-32">
            <p
              data-aos="fade-up"
              data-aos-duration="600"
              className="text-yellow-500 text-2xl font-serif font-semibold tracking-wide"
            >
              Effortless
            </p>
            <h1
              data-aos="fade-up"
              data-aos-duration="600"
              className="text-5xl lg:text-6xl font-bold font-serif leading-tight"
            >
              Car Rental
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="1000"
              className="text-lg text-gray-700 dark:text-gray-300"
            >
              Rent a car with us and enjoy a hassle-free travel experience.
            </p>
            <button
              data-aos="fade-up"
              data-aos-delay="1500"
              onClick={handleGetStarted}
              className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-medium shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            >
              Get Started
            </button>
          </div>

          {/* Image Section */}
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            className="order-1 sm:order-2 flex justify-center"
          >
            <img
              loading="lazy"
              src={theme === "dark" ? img1 : img2}
              alt="Car rental service banner"
              className="relative -z-10 max-h-[600px] sm:scale-110 drop-shadow-[2px_20px_10px_rgba(0,0,0,0.5)] rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop type validation
Hero.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default Hero;
