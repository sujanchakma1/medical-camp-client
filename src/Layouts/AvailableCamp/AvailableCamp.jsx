import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const AvailableCamp = () => {
  const axiosInstance = useAxiosSecure();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [isTwoColumn, setIsTwoColumn] = useState(false);

  const { data: camps = [], isLoading, isError } = useQuery({
    queryKey: ["all-camps"],
    queryFn: async () => {
      const res = await axiosInstance.get("/camps");
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center text-red-500">Failed to load camps.</div>;

  // 🔍 Filter by search
  const filteredCamps = camps.filter((camp) =>
    [camp.camp_name, camp.location, camp.healthcare_professional]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // 🔃 Sorting
  const sortedCamps = [...filteredCamps].sort((a, b) => {
    if (sortBy === "registered") return b.participant_count - a.participant_count;
    if (sortBy === "fees") return parseFloat(a.camp_fees.replace(/[^\d]/g, "")) - parseFloat(b.camp_fees.replace(/[^\d]/g, ""));
    if (sortBy === "name") return a.camp_name.localeCompare(b.camp_name);
    return 0;
  });

  return (
    <div className="py-10 px-4 md:px-10 lg:px-20">
      <h2 className="text-3xl font-bold text-center mb-6">Available Medical Camps</h2>

      {/* 🔍 Search + Sort + Layout controls */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, location, or doctor..."
          className="input input-bordered w-full lg:max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sort */}
        <select
          className="select select-bordered w-full lg:w-52"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="registered">Most Registered</option>
          <option value="fees">Camp Fees (Low → High)</option>
          <option value="name">Alphabetical (A–Z)</option>
        </select>

        {/* Layout Toggle */}
        <button
          onClick={() => setIsTwoColumn(!isTwoColumn)}
          className="btn btn-outline w-full lg:w-40"
        >
          {isTwoColumn ? "3-Column View" : "2-Column View"}
        </button>
      </div>

      {/* 🔳 Cards */}
      <div className={`grid gap-6 ${isTwoColumn ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
        {sortedCamps.map((camp) => (
          <div key={camp._id} className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden">
            <img src={camp.image} alt={camp.camp_name} className="w-full h-52 object-cover" />
            <div className="p-5 flex flex-col gap-2 flex-grow">
              <h3 className="text-xl font-bold">{camp.camp_name}</h3>
              <p className="text-sm text-gray-600">Fees: {camp.camp_fees}</p>
              <p className="text-sm text-gray-600">{camp.date_time}</p>
              <p className="text-sm text-gray-600">{camp.location}</p>
              <p className="text-sm text-gray-600">{camp.healthcare_professional}</p>
              <p className="text-sm text-gray-700 font-medium">Participants: {camp.participant_count}</p>

              <div className="mt-auto flex justify-end pt-4">
                <Link to={`/camp-details/${camp._id}`}>
                  <button className="btn btn-sm btn-secondary ">Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCamp;
