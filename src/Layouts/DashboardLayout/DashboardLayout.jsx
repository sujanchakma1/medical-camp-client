import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { Menu, X } from "lucide-react";
import {
  FaCampground,
  FaChartBar,
  FaClipboardList,
  FaEdit,
  FaHome,
  FaPlusCircle,
  FaUserCircle,
} from "react-icons/fa";
import Logo from "../../Shared/Logo/Logo";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userProfile } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="flex min-h-screen bg-gray-100 max-w-7xl mx-auto">
      {/* Sidebar */}
      <div
        className={`bg-white top-0 left-0 min-h-screen w-70 shadow-md p-4 fixed lg:static z-20 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="mb-10">
          <Logo></Logo>
        </div>
        <nav className="space-y-3">
          {/* Organizer route */}
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
          >
            <FaHome />
            <span>Dashboard Home</span>
          </NavLink>
          {userProfile?.role === "admin" && (
            <>
              <NavLink
                to="/dashboard/profile"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaUserCircle />
                <span>Organizer Profile</span>
              </NavLink>

              <NavLink
                to="/dashboard/add-camp"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaPlusCircle />
                <span>Add a Camp</span>
              </NavLink>

              <NavLink
                to="/dashboard/manage-camp"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaEdit />
                <span>Manage Camp</span>
              </NavLink>

              <NavLink
                to="/dashboard/manage-registered"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaClipboardList />
                <span>Manage Registered Camp</span>
              </NavLink>
            </>
          )}

          {/* Participant  */}
          {userProfile?.role === "user" && (
            <>
              {" "}
              <NavLink
                to="/dashboard/analytics"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaChartBar />
                <span>Analytics</span>
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaUserCircle />
                <span>Participant Profile</span>
              </NavLink>
              <NavLink
                to="/dashboard/my-camp"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaCampground />
                <span>My Camp</span>
              </NavLink>
              <NavLink
                to="/dashboard/registered-camps"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaClipboardList />
                <span>Registered Camps</span>
              </NavLink>
            </>
          )}
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
      <div className="flex-1">
        {/* Topbar Toggle Button for small screens */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button onClick={toggleSidebar} className="p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Outlet for nested routes */}
        <div className="bg-[#f5f4f7]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
