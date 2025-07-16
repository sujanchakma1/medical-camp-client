import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";

const CampDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxiosSecure();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const { data: camp, isLoading, refetch } = useQuery({
    queryKey: ["camp-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/camps/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (!camp) return <div className="text-center text-red-500">Camp not found</div>;

  //  Handle modal form submission
  const handleJoinCamp = async (e) => {
    e.preventDefault();
    const form = e.target;

    const participant = {
      camp_id: id,
      camp_name: camp.camp_name,
      camp_fees: camp.camp_fees,
      location: camp.location,
      healthcare_professional: camp.healthcare_professional,
      participant_name: user?.displayName,
      participant_email: user?.email,
      age: form.age.value,
      phone: form.phone.value,
      gender: form.gender.value,
      emergency_contact: form.emergency.value,
      joined_at: new Date().toISOString()
    };

    const res = await axiosInstance.post("/campParticipants", participant);
    if (res.data.insertedId) {
      Swal.fire("Joined!", "You have successfully joined the camp.", "success");
      setShowModal(false);
      refetch()
    }
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <img src={camp.image} alt={camp.camp_name} className="w-full h-72 object-cover" />
        <div className="p-6 space-y-3">
          <h2 className="text-3xl font-bold">{camp.camp_name}</h2>
          <p><strong>Fees:</strong> {camp.camp_fees}</p>
          <p><strong>Date & Time:</strong> {camp.date_time}</p>
          <p><strong>Location:</strong> {camp.location}</p>
          <p><strong>Healthcare Professional:</strong> {camp.healthcare_professional}</p>
          <p><strong>Participants:</strong> {camp.participant_count}</p>
          <p><strong>Description:</strong> {camp.description}</p>

          <button onClick={() => setShowModal(true)} className="btn btn-primary mt-4">Join Camp</button>
        </div>
      </div>

      {/*  Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-base-300 p-6 rounded-xl w-full max-w-xl relative">
            <button className="absolute top-2 right-3 text-xl" onClick={() => setShowModal(false)}>✕</button>
            <h2 className="text-2xl font-bold mb-4">Join Camp</h2>
            <form onSubmit={handleJoinCamp} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" defaultValue={camp.camp_name} readOnly className="input input-bordered" />
                <input type="text" defaultValue={camp.camp_fees} readOnly className="input input-bordered" />
                <input type="text" defaultValue={camp.location} readOnly className="input input-bordered" />
                <input type="text" defaultValue={camp.healthcare_professional} readOnly className="input input-bordered" />
                <input type="text" defaultValue={user?.displayName} readOnly className="input input-bordered" />
                <input type="email" defaultValue={user?.email} readOnly className="input input-bordered" />
                <input type="number" name="age" required placeholder="Your Age" className="input input-bordered" />
                <input type="tel" name="phone" required placeholder="Phone Number" className="input input-bordered" />
              </div>
              <select name="gender" required className="select select-bordered w-full">
                <option disabled selected>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input type="text" name="emergency" required placeholder="Emergency Contact" className="input input-bordered w-full" />
              <div className="text-right">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampDetails;
