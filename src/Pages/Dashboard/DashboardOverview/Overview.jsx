import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Overview = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = null, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/overview-stats");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;


  const chartData = [
    { name: "Camps", value: stats.totalCamps },
    { name: "Participants", value: stats.totalParticipants },
    { name: "Revenue", value: stats.totalPayments },
  ];

  return (
    <div className="p-6">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10 text-center">
        <div className=" shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Total Camps</h2>
          <p className="text-3xl">{stats.totalCamps}</p>
        </div>
        <div className=" shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Total Participants</h2>
          <p className="text-3xl">{stats.totalParticipants}</p>
        </div>
        <div className=" shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
          <p className="text-3xl">৳{stats.totalPayments}</p>
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
