import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const PaymentForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const { participantId } = useParams(); // param from route
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");

  // ⏳ Load participant data
  const { data: participantInfo, isPending } = useQuery({
    queryKey: ["participant", participantId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/campParticipants/${participantId}`);
      return res.data;
    },
    
  });
  console.log(participantId)

  if (isPending) return "...loading";

  const amount = participantInfo?.camp_fees || 0;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      return;
    } else {
      setError("");
      console.log("Payment Method:", paymentMethod);
    }

    // 🎯 Create Payment Intent
    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      participantId,
    });

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        const paymentData = {
          participant_id: participantId,
          email: user.email,
          amount,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types,
          camp_name: participantInfo?.camp_name,
          camp_id: participantInfo?.camp_id,
          payment_time: new Date().toISOString(),
        };

        // ✅ Save payment to DB
        const paymentRes = await axiosSecure.post("/payments", paymentData);

        if (paymentRes.data.updated) {
          toast.success(`Payment successful for ${participantInfo?.camp_name}`);
          navigate("/dashboard/registered-camps");
        } else {
          toast.error("Payment saved but update failed.");
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
        <CardElement className="p-2 border rounded" />
        <button
          type="submit"
          className="btn btn-primary w-full text-black"
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
