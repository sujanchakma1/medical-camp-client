// src/Pages/Dashboard/AdminHome.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, CalendarCheck, DollarSign } from "lucide-react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loading from "../../Loading/Loading";
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const {
    totalCamps = 0,
    totalParticipants = 0,
    totalPayments = 0,
    recentParticipants = [],
  } = stats;
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-5">
      <Helmet>
        <title>Admin Dashboard || MedCamp</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-2">Welcome, Admin</h1>
      <p className="text-gray-600 mb-6">Here is your dashboard overview.</p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-100 shadow-md p-5 flex items-center gap-4 rounded-lg">
          <CalendarCheck size={32} className="text-blue-700" />
          <div>
            <p className="text-gray-600">Total Camps</p>
            <h3 className="text-xl font-semibold">{totalCamps}</h3>
          </div>
        </div>

        <div className="bg-green-100 shadow-md p-5 flex items-center gap-4 rounded-lg">
          <Users size={32} className="text-green-700" />
          <div>
            <p className="text-gray-600">Total Participants</p>
            <h3 className="text-xl font-semibold">{totalParticipants}</h3>
          </div>
        </div>

        <div className="bg-yellow-100 shadow-md p-5 flex items-center gap-4 rounded-lg">
          <DollarSign size={32} className="text-yellow-700" />
          <div>
            <p className="text-gray-600">Total Payments</p>
            <h3 className="text-xl font-semibold">৳ {totalPayments}</h3>
          </div>
        </div>
      </div>

      {/* Recent Participants Table */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Recent Registrations</h3>
        <div className="overflow-x-auto shadow-md">
          <table className="min-w-full table-auto border">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Camp</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentParticipants.map((p) => (
                <tr key={p._id} className="bg-white hover:bg-gray-50">
                  <td className="px-4 py-2 border">{p.participant_name}</td>
                  <td className="px-4 py-2 border">{p.participant_email}</td>
                  <td className="px-4 py-2 border">{p.camp_name}</td>
                  <td className="px-4 py-2 border">
                    {p.joined_at?.slice(0, 10)}
                  </td>
                </tr>
              ))}
              {recentParticipants.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No recent registrations
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
