import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import Loading from "../../Loading/Loading";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });
  console.log(payments);

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-4">
      <Helmet>
        <title>Payment History || MedCamp</title>
      </Helmet>
      <h2 className="text-3xl text-center font-bold mb-5">Payment History</h2>
      <div className="">
        <table className="table table-zebra overflow-x-auto w-full text-left">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-2">Camp Name</th>
              <th className="px-4 py-2">Fees</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Confirmation</th>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((data) => (
              <tr key={data.transactionId} className="border-b border-gray-400">
                <td className="px-4 py-2">{data.camp_name}</td>
                <td className="px-4 py-2">৳{data.camp_fees}</td>
                <td className="px-4 py-2 text-green-600 font-semibold">
                  {data.payment_status}
                </td>
                <td className="px-4 py-2">
                  {data.confirmation_status === "Confirmed" ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <FaCheckCircle /> Confirmed
                    </span>
                  ) : (
                    <span className="text-yellow-500 flex items-center gap-1">
                      <MdPending /> Pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-sm">{data.transactionId}</td>
                <td className="px-4 py-2 text-sm">
                  {new Date(data.paid_at).toLocaleString()}
                </td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No Payment History found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
