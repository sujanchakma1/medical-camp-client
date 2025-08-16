import React from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import Logo from "../Logo/Logo";
import useAuth from "../../Hook/useAuth";
import { FiLogOut } from "react-icons/fi";
import {
  FaCampground,
  FaClipboardList,
  FaEdit,
  FaHome,
  FaPlusCircle,
  FaUserCircle,
} from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";
import useUserRole from "../../Hook/useUserRole";
import Loading from "../../Pages/Loading/Loading";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const { role, isRoleLoading } = useUserRole();
  if (isRoleLoading) {
    return <Loading></Loading>;
  }

  const links = (
    <>
      <li className="hover:text-primary text-sm">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="hover:text-primary text-sm">
        <NavLink to="/availableCamps">Available Camps</NavLink>
      </li>
      <li className="hover:text-primary text-sm">
        <NavLink to="/blog">Blog</NavLink>
      </li>
      {user && <>
      <li className="hover:text-primary text-sm">
        <NavLink to="/dashboard/profile">Profile</NavLink>
      </li>
      <li className="hover:text-primary text-sm">
        {" "}
        {role === "admin" ? (
          <NavLink to="/dashboard/add-camp">
            <span>Add Camp</span>
          </NavLink>
        ) : (
          <NavLink to="/dashboard/my-camp">
            <span>My Camp</span>
          </NavLink>
        )}
      </li></>}
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
    <div className="bg-secondary px-5 text-gray-800 shadow-sm fixed w-full top-0 z-50">
      <div className="navbar flex justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <Logo></Logo>
        </div>
        <div className="hidden md:block">
          <ul className="menu-horizontal items-center flex gap-5 font-medium">
            {links}
          </ul>
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
                <li className="font-bold text-xl px-3">{user.displayName}</li>
                <li className="font-semibold block md:hidden">
                  <Link to="/availableCamps">Available Camps</Link>
                </li>
                <li className="font-bold">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOutUser}
                    className="btn btn-primary items-center"
                  >
                    <FiLogOut />
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login">
                {" "}
                <button className="btn btn-sm btn-primary rounded-full">
                  Join Us
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
