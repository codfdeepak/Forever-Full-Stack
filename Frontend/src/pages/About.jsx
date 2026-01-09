import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  const features = [
    {
      title: "Quality Assurance",
      desc: "We ensure that every product meets the highest quality standards, from material selection to final packaging, so you can shop with confidence.",
    },
    {
      title: "Convenience",
      desc: "Our platform offers a seamless shopping experience with easy navigation, multiple payment options, and hassle-free delivery to your doorstep.",
    },
    {
      title: "Exceptional Customer Service",
      desc: "Our dedicated support team is available 24/7 to answer your queries, resolve issues, and ensure that your shopping experience is smooth and satisfying.",
    },
  ];

  return (
    <div className="pt-28 px-4 sm:px-12 lg:px-24">
      {/* Page Header */}
      <div className="text-center border-t pt-8">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* About Content */}
      <div className="my-16 flex flex-col md:flex-row gap-12 items-center">
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-lg"
          src={assets.about_img}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At Forever, we are passionate about providing high-quality fashion
            products that suit every style and occasion. Our commitment is to
            deliver exceptional value and trendy designs to our customers.
          </p>
          <p>
            With years of experience in the fashion industry, we ensure that
            each item in our collection is crafted with care, durability, and
            style in mind.
          </p>
          <b className="text-gray-800 text-lg">Our Mission</b>
          <p>
            Our mission is to empower individuals to express themselves through
            fashion. We aim to offer products that combine comfort, quality, and
            style, making shopping an enjoyable and inspiring experience.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-12">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      {/* Features Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-8 bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <NewsletterBox />
    </div>
  );
};

export default About;
