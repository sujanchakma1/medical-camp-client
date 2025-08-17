import Aos from "aos";
import React, { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
  // Validate the targetDate
  const isValidDate = (date) => {
    return !isNaN(new Date(date).getTime());
  };

  const calculateTimeLeft = () => {
    if (!isValidDate(targetDate)) return {};

    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) return {};

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!isValidDate(targetDate)) {
      console.warn("CountdownTimer: Invalid targetDate", targetDate);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    Aos.init({ duration: 2000, once: false });
  }, []);

  return (
    <section
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="bg-base-200 max-w-6xl mx-auto rounded-2xl shadow-md my-8 py-12 px-6 text-center"
    >
      <h2 className="text-3xl font-bold mb-6">Next Medical Camp Countdown</h2>
      <div className="flex justify-center space-x-6">
        {["days", "hours", "minutes", "seconds"].map((interval) => (
          <div
            key={interval}
            className="flex flex-col items-center bg-white px-4 py-3 rounded-xl shadow-md min-w-[70px]"
          >
            <span className="text-3xl font-bold text-blue-600">
              {timeLeft[interval] !== undefined ? timeLeft[interval] : "0"}
            </span>
            <span className="text-gray-600 text-sm capitalize">{interval}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountdownTimer;
