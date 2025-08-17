import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loading from "../../Loading/Loading";
import { TbDetails } from "react-icons/tb";
import { FaCircleRight } from "react-icons/fa6";
import Aos from "aos";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";

const LatestCamp = () => {
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    Aos.init({ duration: 2000, once: false });
  }, []);

  const {
    data: camps = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popular-camps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/recent-camps");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return (
      <div className="text-center text-red-500">Something went wrong!</div>
    );

  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      className="max-w-6xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-center mb-8">
        Latest Medical Camps
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {camps.map((camp, index) => (
          <div
            key={index}
            className="relative bg-base-200 rounded-2xl shadow-md flex flex-col overflow-hidden hover:shadow-xl hover:scale-102 transition-all"
          >
            {/* ✅ Badge top-right */}
            <div className="absolute top-2 right-2">
              <div className="badge badge-warning">Latest</div>
            </div>

            <img
              src={camp.image}
              alt={camp.camp_name}
              className="w-full h-52 object-cover"
            />

            <div className="p-5 flex flex-col gap-2 flex-grow">
              <h3 className="text-xl font-bold">{camp.camp_name}</h3>
              <p className="text-sm text-gray-500">Fees: ৳{camp.camp_fees}</p>
              <p className="text-sm text-gray-500">{camp.date_time}</p>
              <p className="text-sm text-gray-500">{camp.location}</p>
              <p className="text-sm text-gray-500">
                {camp.healthcare_professional}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                Participants: {camp.participant_count}
              </p>

              <div className="mt-auto flex justify-end pt-4">
                <Link to={`/camp-details/${camp._id}`}>
                  <button className="btn btn-sm rounded-2xl btn-primary items-center">
                    <TbDetails />
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link className="flex justify-center py-10" to="/availableCamps">
        <button className="btn rounded-full btn-secondary items-center">
          <FaCircleRight />
          See All Camps
        </button>
      </Link>
    </div>
  );
};

export default LatestCamp;
