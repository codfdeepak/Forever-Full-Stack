import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="w-full border-t">
      {/* Content wrapper */}
      <div className="w-full px-6 sm:px-12 lg:px-20">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
          <div>
            <img src={assets.logo} alt="" className="mb-5 w-32" />
            <p className="text-gray-600 md:w-2/3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
              repellat? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <li>+1-212-345-7860</li>
              <li>contact@foreveryou.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full">
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025 © forever.com – All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
