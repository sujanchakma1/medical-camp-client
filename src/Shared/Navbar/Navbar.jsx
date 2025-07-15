import React from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const links = (
    <>
      <li className="link link-hover">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="link link-hover">
        <NavLink to="/availableCamps">Available Camps</NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-secondary text-white shadow-sm fixed w-full top-0 z-50">
      <div className="navbar flex justify-between max-w-6xl mx-auto">
        <div className="flex items-center">
          <Logo></Logo>
        </div>
        <div className="flex gap-5 items-center">
          <div className=" hidden lg:flex lg:*:gap-5">
            <ul className="menu-horizontal text-sm">{links}</ul>
          </div>
          <div className=" flex gap-5 items-center">
            <Link to="/login">
              {" "}
              <button className="btn btn-primary btn-sm rounded-lg">
                Join Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
