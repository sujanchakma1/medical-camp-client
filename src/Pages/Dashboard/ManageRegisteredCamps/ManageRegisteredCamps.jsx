import React from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../Hook/useAxios";

const ManageRegisteredCamps = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  // 🔍 Fetch all registered participants (for admin)
  const { data: registeredCamps = [], isLoading } = useQuery({
    queryKey: ["allRegisteredCamps"],
    queryFn: async () => {
      const res = await axiosSecure.get('/registered-camps');
      return res.data;
    },
  });

  // ✅ Confirm status mutation
  const confirmMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/confirm-registration/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allRegisteredCamps"]);
    },
  });

  // ❌ Cancel registration
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/cancel-registration/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allRegisteredCamps"]);
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Manage Registered Camps</h2>

      {isLoading ? (
        <p>Loading...</p>
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
                    {camp.confirmation_status === "confirmed" ? (
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
                    <button
                      onClick={() =>
                        handleCancel(
                          camp._id,
                          camp.paymentStatus === "Paid",
                          camp.confirmationStatus === "Confirmed"
                        )
                      }
                      className="btn btn-sm btn-error"
                      disabled={
                        camp.paymentStatus === "Paid" &&
                        camp.confirmationStatus === "Confirmed"
                      }
                    >
                      Cancel
                    </button>
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
