import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div className="pt-28 px-4 sm:px-12 lg:px-24">
      {/* Page Header */}
      <div className="text-center border-t pt-8">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Contact Content */}
      <div className="my-16 flex flex-col md:flex-row gap-12 items-center">
        {/* Image Section */}
        <img
          className="w-full md:max-w-[480px] rounded-xl shadow-lg object-cover"
          src={assets.contact_img}
          alt="Contact Us"
        />

        {/* Info Section */}
        <div className="flex flex-col justify-center items-start gap-6 md:w-2/4">
          {/* Store Info */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full">
            <p className="font-semibold text-xl text-gray-800 mb-2">
              Our Store
            </p>
            <p className="text-gray-600 leading-relaxed">
              201301 Noida, Sector-18 <br />
              Uttar Pradesh, India
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              Tel: (+91) 9199179887 <br />
              Email: admin@forever.com
            </p>
          </div>

          {/* Careers Info */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full">
            <p className="font-semibold text-xl text-gray-800 mb-2">
              Careers at Forever
            </p>
            <p className="text-gray-600 leading-relaxed">
              Join our team to be a part of a creative and dynamic environment.
              Discover opportunities to grow and make a real impact in the
              fashion industry.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBox />
    </div>
  );
};

export default Contact;
