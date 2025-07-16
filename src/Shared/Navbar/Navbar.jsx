import React from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import Logo from "../Logo/Logo";
import useAuth from "../../Hook/useAuth";

const Navbar = () => {
  const { user,logOutUser } = useAuth();
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

   const handleLogOutUser = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          title: "Successfully Log Out!",
          icon: "success",
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  return (
    <div className="bg-secondary text-white shadow-sm fixed w-full top-0 z-50">
      <div className="navbar flex justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <Logo></Logo>
        </div>
        <div className="flex gap-5 items-center">
          <div className=" hidden lg:flex lg:*:gap-5">
            <ul className="menu-horizontal text-sm">{links}</ul>
          </div>
          <div className=" flex gap-5 items-center">
            {user ? (
              <div className="dropdown items-center relative group">
                <div tabIndex={0} role="button" className="cursor-pointer">
                  <a className="my-anchor-element">
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src={user.photoURL}
                      alt="Profile"
                    />
                  </a>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content  bg-gray-500 rounded-box mt-3 w-52 p-2 -left-38 shadow flex gap-5"
                >
                  {links}
                  <button
                  onClick={handleLogOutUser}
                  className="btn btn-primary btn-sm rounded-lg"
                >
                  Log Out
                </button>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login">
                  {" "}
                  <button className="btn btn-primary btn-sm rounded-lg">
                    Join Us
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
