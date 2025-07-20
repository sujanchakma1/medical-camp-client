import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../../Hook/useAxios";
import Loading from "../../Loading/Loading";

const ManageRegisteredCamps = () => {
  const axiosSecure = useAxios();

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [registeredCamps, setRegisteredCamps] = useState([]);

  // Load initial data
  const fetchCamps = async (campName = "") => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/registered-camps${campName ? `?camp_name=${campName}` : ""}`);
      setRegisteredCamps(res.data);
    } catch (err) {
      console.error("Failed to fetch registered camps:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCamps(); // load all initially
  }, []);

  // Confirm status mutation
  const confirmMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/confirm-registration/${id}`);
    },
    onSuccess: () => {
      fetchCamps(searchTerm);
    },
  });

  // Cancel registration
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/cancel-registration/${id}`);
    },
    onSuccess: () => {
      fetchCamps(searchTerm);
    },
  });

  const handleConfirm = (id) => {
    confirmMutation.mutate(id);
  };

  const handleCancel = (id, paid, confirmed) => {
    if (paid && confirmed) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this registration.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
        Swal.fire("Cancelled!", "Registration has been removed.", "success");
      }
    });
  };

  const handleSearch = () => {
    fetchCamps(searchTerm.trim());
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl text-center font-bold mb-6">Manage Registered Camps</h2>

      <div className="flex gap-2 mb-4 max-w-md">
        <input
          type="text"
          placeholder="Search by Camp Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full"
        />
        <button onClick={handleSearch} className="btn btn-primary">Search</button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Camp Name</th>
                <th>Camp Fees</th>
                <th>Participant Name</th>
                <th>Email</th>
                <th>Payment</th>
                <th>Confirmation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {registeredCamps.map((camp, index) => (
                <tr key={camp._id} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>{camp.camp_name}</td>
                  <td>৳{camp.camp_fees}</td>
                  <td>{camp.participant_name}</td>
                  <td>{camp.participant_email}</td>
                  <td>
                    <span
                      className={`badge ${
                        camp.payment_status === "paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {camp.payment_status}
                    </span>
                  </td>
                  <td>
                    {camp.confirmation_status === "Confirmed" ? (
                      <span className="badge badge-info">Confirmed</span>
                    ) : (
                      <button
                        onClick={() => handleConfirm(camp._id)}
                        className="btn btn-sm btn-primary"
                      >
                        Pending
                      </button>
                    )}
                  </td>
                  <td>
                    {camp.payment_status === "Paid" ? (
                      <button
                        disabled
                        className="btn btn-sm btn-error cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCancel(camp._id)}
                        className="btn btn-sm btn-error"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {registeredCamps.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No registrations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageRegisteredCamps;
