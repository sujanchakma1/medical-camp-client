import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import Loading from "../Loading/Loading";

const CampDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const modalRef = useRef(null);

  const {
    data: camp,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["camp-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/camps/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <Loading></Loading>;
  if (!camp)
    return <div className="text-center text-red-500">Camp not found</div>;

  const handleJoinCamp = async (e) => {
    e.preventDefault();
    const form = e.target;

    const campFee = camp.camp_fees;

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
      joined_at: new Date().toISOString(),
      confirmation_status: "Pending",
      payment_status: `${campFee == "Free" ? "Paid" : "Pending"}`,
    };

    const res = await axiosInstance.post("/participant", participant);
    if (res.data.insertedId) {
      Swal.fire("Joined!", "You have successfully joined the camp.", "success");
      refetch();
      if (modalRef.current) modalRef.current.close();
      navigate("/dashboard/my-camp");
    } else {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <img
          src={camp.image}
          alt={camp.camp_name}
          className="w-full h-72 object-cover"
        />
        <div className="p-6 space-y-3">
          <h2 className="text-3xl font-bold">{camp.camp_name}</h2>
          <p>
            <strong>Fees:</strong> ৳{camp.camp_fees}
          </p>
          <p>
            <strong>Date & Time:</strong> {camp.date_time}
          </p>
          <p>
            <strong>Location:</strong> {camp.location}
          </p>
          <p>
            <strong>Healthcare Professional:</strong>{" "}
            {camp.healthcare_professional}
          </p>
          <p>
            <strong>Participants:</strong> {camp.participant_count}
          </p>
          <p>
            <strong>Description:</strong> {camp.description}
          </p>

          <button
            onClick={() => modalRef.current && modalRef.current.showModal()}
            className="btn btn-primary mt-4"
          >
            Join Camp
          </button>
        </div>
      </div>

      <dialog id="my_modal_3" className="modal" ref={modalRef}>
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h2 className="text-2xl font-bold mb-4">Join Camp</h2>
          <form onSubmit={handleJoinCamp} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                defaultValue={camp.camp_name}
                readOnly
                className="input input-bordered"
              />
              <input
                type="text"
                defaultValue={camp.camp_fees}
                readOnly
                className="input input-bordered"
              />
              <input
                type="text"
                defaultValue={camp.location}
                readOnly
                className="input input-bordered"
              />
              <input
                type="text"
                defaultValue={camp.healthcare_professional}
                readOnly
                className="input input-bordered"
              />
              <input
                type="text"
                defaultValue={user?.displayName}
                readOnly
                className="input input-bordered"
              />
              <input
                type="email"
                defaultValue={user?.email}
                readOnly
                className="input input-bordered"
              />
              <input
                type="number"
                name="age"
                required
                placeholder="Your Age"
                className="input input-bordered"
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone Number"
                className="input input-bordered"
              />
            </div>
            <select
              name="gender"
              required
              className="select select-bordered w-full"
            >
              <option disabled selected>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="emergency"
              required
              placeholder="Emergency Contact"
              className="input input-bordered w-full"
            />
            <div className="text-right">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CampDetails;
