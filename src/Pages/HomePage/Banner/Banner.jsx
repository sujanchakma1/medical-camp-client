import React from "react";
import bgBanner from "../../../assets/banner/bg-banner.png";
import doctor from "../../../assets/banner/doctor.jpg";
import Logo from "../../../Shared/Logo/Logo";
import { Link } from "react-router";
import { FaCircleRight } from "react-icons/fa6";

const Banner = () => {
  return (
    <div
      className="py-10 bg-no-repeat"
      style={{ backgroundImage: `url(${bgBanner})` }}
    >
      <div className=" max-w-6xl mx-auto">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="flex-1/3">
            <img
              src={doctor}
              className="max-w-sm rounded-full p-3 bg-primary"
            />
          </div>
          <div className="flex-2/3 space-y-5">
            <Logo></Logo>
            <h2 className="text-5xl font-bold text-primary">Medical Camp</h2>
            <p className="py-2 max-w-md">
              Bringing healthcare closer to communities through mobile medical
              camps.{" "}
            </p>
            <Link className="" to="/availableCamps">
              <button className="btn rounded-full btn-primary items-center">
                <FaCircleRight />
                See More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
