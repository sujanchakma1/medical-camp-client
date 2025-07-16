import React from "react";
import bgBanner from "../../../assets/banner/bg-banner.png";
import doctor from '../../../assets/banner/doctor.jpg'
import Logo from "../../../Shared/Logo/Logo";

const Banner = () => {
  return (
    <div className="py-10 bg-no-repeat" style={{ backgroundImage: `url(${bgBanner})` }} >
      <div className=" max-w-6xl mx-auto">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="flex-1/3">
            <img
            src={doctor}
            className="max-w-sm rounded-full p-3 bg-blue-800"
          />
          </div>
          <div className="flex-2/3 space-y-5">
            <Logo></Logo>
            <h2 className="text-5xl font-bold text-secondary">Medical center</h2>
            <p className="py-2 max-w-md">
             Over 500 patients received free medical checkups in our last rural camp — changing lives, one diagnosis at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
