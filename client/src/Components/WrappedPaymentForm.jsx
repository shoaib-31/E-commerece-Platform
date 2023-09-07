import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { clientconfig } from "../../clientconfig";
import { clearCart } from "../features/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
const { url, stripePublic } = clientconfig;
const stripePromise = loadStripe(stripePublic);
const PaymentForm = () => {
  const navigate = useNavigate();
  const [cardHolderName, setCardHolderName] = useState("");
  const { user } = useSelector((state) => state.user);
  const token = user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const dispatch = useDispatch();
  const { cart, totalPrice } = useSelector((state) => state.allCart);
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  let secret = clientSecret;
  const handlePayment = async () => {
    try {
      setLoading(true);

      // Create a PaymentIntent on your server
      const response = await axios.post(
        `${url}/payments/create-payment-intent`,
        {
          amount: totalPrice * 100, // Adjust as needed
          // other order details
        },
        { headers }
      );

      const { clientSecret } = response.data;
      setClientSecret(clientSecret);

      // Use Stripe.js to confirm the payment
      const result = await stripe.confirmCardPayment(secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (result.error) {
        // Handle payment failure
        setCardError(result.error.message);
        console.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        // Handle successful payment
        const OrderResponse = await axios.post(
          `${url}/orders/`,
          { cart },
          { headers }
        );
        navigate("/");
        dispatch(clearCart());
        // Update your Redux state, e.g., mark the order as paid
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  if (!stripe || !elements) {
    return "...loading";
  }
  return (
    <PayBox>
      <Head>You are paying ₹{totalPrice}.00</Head>
      <TextField
        label="Cardholder Name"
        fullWidth
        variant="outlined"
        margin="normal"
        required
        value={cardHolderName}
        onChange={(e) => setCardHolderName(e.target.value)}
        sx={{ margin: "0" }}
      />
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
            },
          },
        }}
      />
      {cardError && <div style={{ color: "red" }}>{cardError}</div>}
      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment}
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </PayBox>
  );
};

const WrappedPaymentForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};
const PayBox = styled.div`
  width: 20rem;
  margin: 20vh auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  min-height: 20vh;
`;
const Head = styled.h1`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
`;
export default WrappedPaymentForm;
