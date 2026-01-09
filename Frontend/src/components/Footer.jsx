import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t mt-20">
      {/* Content wrapper */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 grid sm:grid-cols-[3fr_1fr_1fr] gap-10">
        {/* Logo & Description */}
        <div>
          <img
            src={assets.logo}
            alt="Logo"
            className="mb-5 w-36 object-contain"
          />
          <p className="text-gray-600 text-sm sm:text-base md:w-2/3 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
            repellat? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-lg sm:text-xl font-semibold mb-5 text-gray-800">
            COMPANY
          </p>
          <ul className="flex flex-col gap-2">
            {["Home", "About Us", "Delivery", "Privacy Policy"].map((link) => (
              <li
                key={link}
                className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-300 text-sm sm:text-base"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-lg sm:text-xl font-semibold mb-5 text-gray-800">
            GET IN TOUCH
          </p>
          <ul className="flex flex-col gap-2 text-gray-600 text-sm sm:text-base">
            <li className="hover:text-blue-600 cursor-pointer transition-colors duration-300">
              +1-212-345-7860
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors duration-300">
              contact@foreveryou.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-gray-200 bg-gray-50">
        <p className="py-5 text-sm text-center text-gray-500">
          © 2025 forever.com – All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
