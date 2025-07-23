import React from "react";
import logo from "../../assets/logo/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center gap-2">
        <img src={logo} alt="" className="w-10" />
        <h2 className="md:text-2xl text-md font-bold text-primary"> MedCamp</h2>
      </div>
    </Link>
  );
};

export default Logo;
