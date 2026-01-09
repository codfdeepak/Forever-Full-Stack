import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // You can add form submission logic here
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Subscribe Now & Get 20% Off
        </h2>
        <p className="text-gray-500 mt-4 text-base sm:text-lg">
          Stay updated with our latest products and offers. Enter your email
          below to subscribe.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-center items-center bg-white border rounded-lg shadow-md overflow-hidden"
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full sm:flex-1 px-4 py-3 outline-none text-gray-700"
          />
          <button
            type="submit"
            className="bg-black text-white font-semibold px-8 py-3 sm:py-3 hover:bg-gray-800 transition-colors duration-300"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterBox;
