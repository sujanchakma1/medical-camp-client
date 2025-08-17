import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import Logo from "../Logo/Logo";
import useAuth from "../../Hook/useAuth";
import { FiLogOut } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import useUserRole from "../../Hook/useUserRole";
import Loading from "../../Pages/Loading/Loading";
import { X } from "lucide-react";


const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const { role, isRoleLoading } = useUserRole();
  const [theme, setTheme] = useState("light");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  useEffect(() => {
    // dark mode default if no theme saved
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

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
      {user && (
        <>
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
          </li>
          <li className="hover:text-primary text-sm">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      )}
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
    <div className="bg-secondary px-5 shadow-sm fixed w-full top-0 z-50">
      <div className="navbar flex justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <Logo></Logo>
        </div>
        <div className="hidden md:block">
          <ul className="menu-horizontal items-center flex gap-5 font-medium">
            {links}
          </ul>
        </div>
        <div className=" flex gap-3 items-center">
          <label className="toggle text-base-content">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
              aria-label="Toggle theme"
            />

            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>

            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>
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
                className="menu space-y-5 dropdown-content bg-base-300 rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
              >
                <li className="font-semibold text-xl px-3">{user.displayName}</li>
                <li className="font-medium">
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
          <div className=" items-center  md:hidden">
            <div onClick={toggleDrawer}>
              <IoMenu size={32} />
            </div>
            {/* Overlay */}
            {isOpen && (
              <div className="fixed inset-0 z-40" onClick={toggleDrawer}></div>
            )}
            {/* Top Drawer */}
            <div
              className={`fixed top-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-in-out
        ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } bg-base-300 shadow-md p-6`}
            >
              <div className="flex justify-end items-center mb-4">
                <button onClick={toggleDrawer}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ul className="space-y-3 font-semibold text-center">
                {links}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
