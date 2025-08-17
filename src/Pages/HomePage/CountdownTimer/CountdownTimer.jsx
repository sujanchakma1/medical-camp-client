import Aos from "aos";
import React, { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    Aos.init({ duration: 2000, once: false });
  }, []);

  return (
    <section
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="bg-base-200 max-w-6xl mx-auto rounded-2xl shadow-md  my-8 py-12 px-6 text-center"
    >
      <h2 className="text-3xl font-bold mb-6">Next Medical Camp Countdown</h2>
      <div className="flex justify-center space-x-6">
        {["days", "hours", "minutes", "seconds"].map((interval) => (
          <div
            key={interval}
            className="flex flex-col items-center bg-white px-4 py-3 rounded-xl shadow-md"
          >
            <span className="text-3xl font-bold text-blue-600">
              {timeLeft[interval] || "0"}
            </span>
            <span className="text-gray-600 text-sm capitalize">{interval}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountdownTimer;
