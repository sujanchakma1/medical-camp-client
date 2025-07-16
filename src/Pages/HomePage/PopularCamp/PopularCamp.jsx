import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { Link } from "react-router";

const PopularCamp = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: camps = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popular-camps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popular-camps");
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">Something went wrong!</div>
    );

  return (
    <div className="py-10 px-4 md:px-10 lg:px-20">
      <h2 className="text-3xl font-bold text-center mb-8">
        Popular Medical Camps
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {camps.map((camp, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl"
          >
            <img
              src={camp.image}
              alt={camp.camp_name}
              className="w-full h-52 object-cover"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-bold">{camp.camp_name}</h3>
              <p className="text-sm text-gray-600">Fees: {camp.camp_fees}</p>
              <p className="text-sm text-gray-600">{camp.date_time}</p>
              <p className="text-sm text-gray-600">{camp.location}</p>
              <p className="text-sm text-gray-600">
                {camp.healthcare_professional}
              </p>
              <p className="text-sm text-gray-700 font-medium">
                Participants: {camp.participant_count}
              </p>
              <div className="mt-auto flex justify-end pt-4">
                <Link to={`/camp-details/${camp._id}`}>
                  <button className="btn btn-sm btn-secondary ">Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link className="flex justify-center py-10" to="/availableCamps">
        <button className="btn btn-primary">See All Camps</button>
      </Link>
    </div>
  );
};

export default PopularCamp;
