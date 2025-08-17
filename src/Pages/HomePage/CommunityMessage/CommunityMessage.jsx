import React, { useEffect } from "react";
import { Users } from "lucide-react";
import { Link } from "react-router";
import Aos from "aos";

const CommunityMessage = () => {
  useEffect(() => {
      Aos.init({ duration: 2000, once: false });
    }, []);
  return (
    <section data-aos="fade-up"
      data-aos-anchor-placement="top-bottom" className="bg-base-200 max-w-6xl mx-auto rounded-2xl shadow-md my-12 py-8  text-center">
      <div className="flex flex-col items-center space-y-4">
        <Users className="w-12 h-12 t" />
        <h2 className="text-3xl font-bold ">
          Join Us to Build a Healthier Community
        </h2>
        <p className="text-gray-500 max-w-xl">
          Together we can raise awareness, provide better healthcare, and ensure
          a brighter, healthier future for everyone. Be a part of our medical
          camp and make a difference!
        </p>
        <Link to="/availableCamps">
          <button className="btn btn-secondary rounded-full">
            Get Involved
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CommunityMessage;
