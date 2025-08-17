import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../../Hook/useAuth";
import Loading from "../../Loading/Loading";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";

const Analytics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: participants = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["participants", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/participants?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load data.</p>;

  const chartData = participants.map((item) => ({
    name: item.camp_name,
    fees: parseFloat(item.camp_fees),
  }));

  return (
    <div className="p-5">
      <Helmet>
        <title>Analytics || MedCamp</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-5 text-center">
        Camp Fee Analytics
      </h2>
      {chartData.length === 0 ? (
        <p className="text-center text-gray-500">
          No registered camps to display.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="৳" ticks={[10, 50, 100, 150, 200]} />
            <Tooltip />
            <Bar dataKey="fees" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Analytics;
