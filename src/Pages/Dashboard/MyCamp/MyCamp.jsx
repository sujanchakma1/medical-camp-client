import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrash, FaMoneyCheckAlt } from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";
import Loading from "../../Loading/Loading";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";

const MyCamp = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Get participant data by email
  const {
    data: myCamps = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-registered-camps", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/participants?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  // ✅ Delete handler
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel your registration?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/cancel-registration/${id}`);
        Swal.fire(
          "Cancelled!",
          "Your registration has been deleted.",
          "success"
        );
        refetch();
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  // ✅ Pay handler (redirect to stripe or another route)
  const handlePay = (camp) => {
    // Navigate to payment page (pass camp info or ID)
    navigate(`/dashboard/payment/${camp._id}`);
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>My Camp || MedCamp</title>
      </Helmet>
      <h2 className="text-3xl text-center font-bold mb-5">
        My Registered Camps
      </h2>
      <div className="">
        <table className="table table-zebra overflow-x-auto w-full text-left">
          <thead className="">
            <tr>
              <th>Camp Name</th>
              <th>Fees</th>
              <th>Payment Status</th>
              <th>Confirmation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myCamps.map((camp) => (
              <tr key={camp._id} className="">
                <td>{camp.camp_name}</td>
                <td>৳{camp.camp_fees}</td>
                <td>{camp.payment_status}</td>
                <td>{camp.confirmation_status}</td>
                <td className="flex gap-2">
                  {camp.payment_status === "Pending" && (
                    <button
                      onClick={() => handlePay(camp)}
                      className="bg-primary text-white px-2 py-1 rounded hover:bg-secondary cursor-pointer flex items-center gap-1"
                    >
                      <FaMoneyCheckAlt /> Pay
                    </button>
                  )}
                  {camp.payment_status === "Paid" ? (
                    <button
                      onClick={() => handleDelete(camp._id)}
                      disabled
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-not-allowed  flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDelete(camp._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {myCamps.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
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

export default MyCamp;
