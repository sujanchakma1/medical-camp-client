import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";



const stripePromise = loadStripe (import.meta.env.VITE_public_key)
const Payment = () => {
  return (
    <div>
      <h2 className="font-bold text-3xl text-center py-5">Please Pay</h2>
      <Elements stripe={stripePromise}>
        <PaymentForm></PaymentForm>
      </Elements>
    </div>
  );
};

export default Payment;
