import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import { Menu, X } from "lucide-react";
import {
  FaCampground,
  FaChartBar,
  FaClipboardList,
  FaEdit,
  FaHome,
  FaMoneyCheckAlt,
  FaPlusCircle,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import Logo from "../../Shared/Logo/Logo";
import useUserRole from "../../Hook/useUserRole";
import Loading from "../../Pages/Loading/Loading";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const { role, isRoleLoading } = useUserRole();
  if (isRoleLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex  min-h-screen max-w-7xl mx-auto">
      {/* Sidebar */}
      <div
        className={`bg-secondary top-0 left-0 min-h-full w-70 shadow-md p-4 fixed lg:static z-20 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="mb-10">
          <Logo></Logo>
        </div>
        <nav className="space-y-3">
          {/* Organizer route */}
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
          >
            <FaHome />
            <span>Dashboard Home</span>
          </Link>
          {role === "admin" && (
            <>
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaUserCircle />
                <span>Organizer Profile</span>
              </Link>

              <Link
                to="/dashboard/add-camp"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaPlusCircle />
                <span>Add Camp</span>
              </Link>

              <Link
                to="/dashboard/manage-camp"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaEdit />
                <span>Manage Camp</span>
              </Link>

              <Link
                to="/dashboard/manage-registered"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaClipboardList />
                <span>Manage Registered Camp</span>
              </Link>

              <Link
                to="/dashboard/volunteers"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaUsers />
                <span>Volunteers</span>
              </Link>
            </>
          )}

          {/* Participant  */}
          {role === "user" && (
            <>
              {" "}
              <Link
                to="/dashboard/analytics"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaChartBar />
                <span>Analytics</span>
              </Link>
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaUserCircle />
                <span>Participant Profile</span>
              </Link>
              <Link
                to="/dashboard/my-camp"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaCampground />
                <span>My Camp</span>
              </Link>
              <Link
                to="/dashboard/registered-camps"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaClipboardList />
                <span>Registered Camps</span>
              </Link>
              <Link
                to="/dashboard/payment-history"
                className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-200 text-gray-700"
              >
                <FaMoneyCheckAlt />
                <span>Payment History</span>
              </Link>
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
      <div className="flex-1 max-w-6xl mx-auto">
        {/* Topbar Toggle Button for small screens */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button onClick={toggleSidebar} className="p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Outlet for nested routes */}
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
