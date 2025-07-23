import React from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import Logo from "../Logo/Logo";
import useAuth from "../../Hook/useAuth";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
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
    <div className="bg-gradient-to-r from-blue-100 to-secondary px-5 text-gray-800 shadow-sm fixed w-full top-0 z-50">
      <div className="navbar flex justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <Logo></Logo>
        </div>
        <div className="flex gap-5 items-center">
          <div className="hidden md:block">
            <ul className="menu-horizontal flex gap-3 text-sm">{links}</ul>
          </div>
          <div className=" flex gap-5 items-center">
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="cursor-pointer">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={user.photoURL}
                    alt="Profile"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="menu space-y-5 dropdown-content bg-base-300 text-black rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
                >
                  <li className="font-bold text-xl px-3">
                    {user.displayName}
                  </li>
                  <li className="font-semibold">
                    <Link to="/availableCamps">
                      Available Camps
                    </Link>
                  </li>
                  <li className="font-semibold">
                    <Link to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOutUser}
                      className="btn btn-primary"
                    >
                      Log Out
                    </button>
                  </li>
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
