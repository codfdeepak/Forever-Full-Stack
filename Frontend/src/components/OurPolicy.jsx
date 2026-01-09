import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      desc: "Hassle-free exchange for your convenience",
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return Policy",
      desc: "Enjoy 7 days free return policy",
    },
    {
      icon: assets.support_img,
      title: "Best Customer Support",
      desc: "24/7 dedicated customer support",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex flex-col sm:flex-row justify-around gap-10 text-center">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
          >
            <img src={policy.icon} alt={policy.title} className="w-14 h-14" />
            <p className="font-semibold text-lg text-gray-800">
              {policy.title}
            </p>
            <p className="text-gray-500 text-sm md:text-base">{policy.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPolicy;
