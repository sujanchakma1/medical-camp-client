import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle, FaTimesCircle, FaStar } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../Hook/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";

const RegisteredCamps = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: camps = [], refetch } = useQuery({
    queryKey: ["registeredCamps", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/participants?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel your registration.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
    });
    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/cancel-registration/${id}`);
      Swal.fire("Cancelled", "Your registration has been removed.", "success");
      refetch();
    }
  };

  return (
    <div className="p-5">
      <Helmet>
        <title>Registered Camp || MedCamp</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-6">Registered Camps</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="">
            <tr>
              <th className="px-4 py-2">Camp Name</th>
              <th className="px-4 py-2">Fees</th>
              <th className="px-4 py-2">Participant</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Confirmation</th>
              <th className="px-4 py-2">Feedback</th>
              <th className="px-4 py-2">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp) => (
              <tr
                key={camp._id}
                className=""
              >
                <td className="px-4 py-2">{camp.camp_name}</td>
                <td className="px-4 py-2">৳{camp.camp_fees}</td>
                <td className="px-4 py-2">{camp.participant_name}</td>
                <td className="px-4 py-2">
                  {camp.payment_status === "Paid" ? (
                    <span className="text-green-600 font-bold">
                      Paid <FaCheckCircle className="inline" />
                    </span>
                  ) : (
                    <Link to={`/dashboard/payment/${camp._id}`}>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded">
                        Pay
                      </button>
                    </Link>
                  )}
                </td>
                <td className="px-4 py-2">
                  {camp.confirmation_status === "Confirmed" ? (
                    <span className="text-green-600 font-semibold">
                      Confirmed
                    </span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {camp.payment_status === "Paid" ? (
                    <Link to={`/dashboard/feedback/${camp._id}`}>
                      <button className="text-yellow-600 hover:underline flex items-center gap-1 justify-center">
                        <FaStar /> Give Feedback
                      </button>
                    </Link>
                  ) : (
                    <span className="text-gray-400">Not Available</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {camp.payment_status === "Paid" ? (
                    <button
                      disabled
                      className="text-gray-400 cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCancel(camp._id)}
                      className="text-red-500 hover:underline"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {camps.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No registered camps found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredCamps;
