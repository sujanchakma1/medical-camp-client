import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { TbCampfire } from "react-icons/tb";
import { FaUsers, FaMoneyBillWave } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Overview = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["overview-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/overview-stats");
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const totalCamps = stats?.totalCamps || 0;
  const totalParticipants = stats?.totalParticipants || 0;
  const totalPayments = stats?.totalPayments || 0;

  const chartData = [
    { name: "Camps", value: totalCamps },
    { name: "Participants", value: totalParticipants },
    { name: "Revenue", value: totalPayments },
  ];

  return (
    <div className="p-6">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap--8 mb-10 text-center">
        <div className="shadow rounded p-6 flex flex-col items-center justify-center">
          <TbCampfire className="text-5xl mb-3 text-orange-500" />
          <h2 className="text-xl font-semibold mb-2">Total Camps</h2>
          <p className="text-3xl text-gray-600">{totalCamps}</p>
        </div>
        <div className="shadow rounded p-6 flex flex-col items-center justify-center">
          <FaUsers className="text-5xl mb-3 text-blue-500" />
          <h2 className="text-xl font-semibold mb-2">Total Participants</h2>
          <p className="text-3xl text-gray-600">{totalParticipants}</p>
        </div>
        <div className="shadow rounded p-6 flex flex-col items-center justify-center">
          <FaMoneyBillWave className="text-5xl mb-3 text-green-500" />
          <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
          <p className="text-3xl text-gray-600">{totalPayments} ৳</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="flex justify-center">
        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Overview;
