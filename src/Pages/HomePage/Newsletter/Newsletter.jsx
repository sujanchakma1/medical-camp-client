import Aos from "aos";
import React, { useEffect } from "react";
import { Link } from "react-router";

const Newsletter = () => {
  useEffect(() => {
    Aos.init({ duration: 2000, once: false });
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="max-w-6xl mx-auto py-10"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-base md:text-lg mb-6">
          Get the latest updates about our medical camps, health awareness tips,
          and upcoming events directly in your inbox.
        </p>

        <form className="flex sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className=" rounded-xl sm:w-1/2 input focus:outline-none"
            required
          />
          <Link
            type="submit"
            className="btn btn-secondary rounded-full"
            to="/blog"
          >
            Subscribe
          </Link>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
