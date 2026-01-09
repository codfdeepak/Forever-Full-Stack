import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="relative w-full h-[90vh] md:h-[80vh] flex flex-col md:flex-row overflow-hidden pt-16">
      {/* Left Side - Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-6 md:px-16 lg:px-24 z-10">
        {/* Tagline */}
        <p className="text-sm md:text-base font-medium text-gray-600 mb-2 tracking-wide">
          OUR BESTSELLERS
        </p>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-snug mb-6">
          Latest Arrivals
        </h1>

        {/* CTA Button */}
        {/* <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-semibold transition-all duration-300">
          SHOP NOW
        </button> */}
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 relative">
        <img
          src={assets.hero_img}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        {/* Optional overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-transparent"></div>
      </div>

      {/* Optional background decorative shapes */}
      <div className="hidden md:block absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full -translate-x-1/3 -translate-y-1/3"></div>
      <div className="hidden md:block absolute bottom-0 left-0 w-32 h-32 bg-pink-100 rounded-full translate-x-1/4 translate-y-1/4"></div>
    </div>
  );
};

export default Hero;
