import Aos from "aos";
import React, { useEffect, useState } from "react";

const HealthTips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    fetch("/healthTips.json")
      .then((res) => res.json())
      .then((data) => setTips(data));
  }, []);
  useEffect(() => {
    Aos.init({ duration: 2000, once: false });
  }, []);

  return (
    <section
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className=" px-4 max-w-6xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Health Awareness & Tips
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-gray-50 to-gray-200 rounded-xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {tip.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3">{tip.shortDescription}</p>

            <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {tip.category}
              </span>
              <span>{tip.published_date}</span>
            </div>
            <p className="text-right mt-3 text-sm text-gray-700 font-medium">
              By {tip.author}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HealthTips;
