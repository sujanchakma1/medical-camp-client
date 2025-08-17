import { useQuery } from "@tanstack/react-query";
import { TbCampfire } from "react-icons/tb";
import { FaUsers, FaMoneyBillWave } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";
import Loading from "../../Loading/Loading";
import Aos from "aos";
import { useEffect } from "react";

const KeyStats = () => {
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    Aos.init({ duration: 2000, once: false });
  }, []);


  const { data: stats, isLoading } = useQuery({
    queryKey: ["overview-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/overview-stats");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const totalCamps = stats?.totalCamps || 0;
  const totalParticipants = stats?.totalParticipants || 0;
  const totalRevenue = stats?.totalPayments || 0;

  const statsData = [
    {
      title: "Total Camps",
      value: totalCamps,
      icon: <TbCampfire className="text-5xl text-orange-500 mb-3" />,
    },
    {
      title: "Participants",
      value: totalParticipants,
      icon: <FaUsers className="text-5xl text-blue-500 mb-3" />,
    },
    {
      title: "Revenue",
      value: `৳${totalRevenue}`,
      icon: <FaMoneyBillWave className="text-5xl text-green-500 mb-3" />,
    },
  ];

  return (
    <section
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="max-w-6xl mx-auto my-16"
    >
      <h2 className="text-3xl font-bold text-center mb-8">Key Stats</h2>
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {statsData.map((item, index) => (
          <div
            key={index}
            className="shadow-lg rounded-xl p-6 flex flex-col items-center hover:scale-105 transition-all"
          >
            {item.icon}
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-3xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyStats;
