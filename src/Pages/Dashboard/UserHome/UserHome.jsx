// src/Pages/Dashboard/UserHome.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const UserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["user-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const {
    totalRegisteredCamps = 0,
    confirmedCamps = 0,
  } = stats;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">Welcome, {user?.displayName || "User"}</h1>
      <p className="text-gray-600">Here's your activity summary:</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-blue-100 rounded-xl p-5 shadow-md">
          <p className="text-gray-700">Registered Camps</p>
          <h2 className="text-2xl font-semibold">{totalRegisteredCamps}</h2>
        </div>
        <div className="bg-green-100 rounded-xl p-5 shadow-md">
          <p className="text-gray-700">Confirmed Camps</p>
          <h2 className="text-2xl font-semibold">{confirmedCamps}</h2>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
