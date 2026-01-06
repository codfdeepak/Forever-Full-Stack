import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className=" flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            dolore suscipit praesentium ipsa quia quos labore libero aperiam
            saepe quam architecto, rerum nisi voluptatibus corrupti eaque qui
            aliquam sed similique.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Voluptatibus et beatae quae quidem perferendis quis nihil,
            recusandae quam soluta libero.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            explicabo mollitia reprehenderit alias cupiditate laboriosam
            ducimus? Nulla inventore enim fugiat, praesentium veniam aliquam
            soluta possimus, rerum magni aspernatur animi corporis libero.
            Doloribus laborum dolorum ipsa minus exercitationem omnis deserunt
            quisquam.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Qaulity Assurance:</b>
          <p className=" text-gray-600 ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
            totam minima, quos laudantium suscipit perferendis id voluptatum
            assumenda dolorem iste at magni delectus optio ea adipisci modi
            nulla expedita repudiandae.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Convenience :</b>
          <p className=" text-gray-600 ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi
            explicabo nisi, molestiae id veritatis officia debitis facilis
            ratione eligendi eos voluptatum perspiciatis ea accusamus nesciunt
            sapiente enim ad quibusdam velit.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Exceptional Customer Service :</b>
          <p className=" text-gray-600 ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
            saepe modi labore dignissimos accusantium veniam animi sequi atque!
            Deleniti, officia!
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
