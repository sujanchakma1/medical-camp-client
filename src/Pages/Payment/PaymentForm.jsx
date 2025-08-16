import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import Loading from "../Loading/Loading";

const PaymentForm = () => {
  const navigate = useNavigate()
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const { participantId } = useParams();
  const axiosSecure = useAxiosSecure();
  console.log(participantId);
  const [error, setError] = useState("");

  const { data: participantInfo, isPending } = useQuery({
    queryKey: ["participant", participantId],
    queryFn: async () => {
      const res = await axiosSecure.get(`participant/${participantId}`);
      return res.data;
    },
  });
  if (isPending) {
    return <Loading></Loading>;
  }
  console.log(participantInfo);

  const amount = participantInfo.camp_fees;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("payment method", paymentMethod);
    }
    const res = await axiosSecure.post("create-payment-intent", {
      amountInCents,
      participantId,
    });
    const clientSecret = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: `${user.displayName}`,
          email: `${user.email}`,
        },
      },
    });
    if (result.error) {
      setError(result.error.message);
    } else {
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        console.log(result);
        const paymentData = {
          participantId,
          email: user.email,
          amount,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types,
        };
        const paymentRes = await axiosSecure.post("/payments", paymentData);
        if (paymentRes.data.insertedId) {
          console.log(paymentRes.data)
          toast.success(`Payment successfully! ${participantInfo.camp_name}`);
          navigate('/dashboard/my-camp')
        }
      }
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white space-y-4 p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded "></CardElement>
        <button
          type="submit"
          className="btn rounded-full btn-primary w-full text-black"
          disabled={!stripe}
        >
          Pay ৳{amount}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
