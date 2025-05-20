import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("http://localhost:8080/payments/", {
      amount: 2000, // $20.00
    });

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setMessage(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      setMessage("Payment successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={!stripe}>Pay</button>
      <p>{message}</p>
    </form>
  );
}

export default CheckoutForm;