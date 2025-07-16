import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { Menu, X } from "lucide-react";
import { FaClipboardList, FaEdit, FaPlusCircle, FaUserCircle } from "react-icons/fa";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen overflow-x-auto bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white top-0 left-0 h-full w-80 shadow-md p-4 fixed lg:static z-20 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-3">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <FaUserCircle />
            <span>Organizer Profile</span>
          </NavLink>

          <NavLink
            to="/dashboard/add-camp"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <FaPlusCircle />
            <span>Add a Camp</span>
          </NavLink>

          <NavLink
            to="/dashboard/manage-camp"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <FaEdit />
            <span>Manage Camp</span>
          </NavLink>

          <NavLink
            to="/dashboard/manage-registered"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <FaClipboardList />
            <span>Manage Registered Camp</span>
          </NavLink>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-30 z-10 lg:hidden"
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 overflow-y-auto w-full p-4">
        {/* Topbar Toggle Button for small screens */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button onClick={toggleSidebar} className="p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Outlet for nested routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
