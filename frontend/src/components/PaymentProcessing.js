import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PaymentProcessing = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract totalAmount and cartItems from location state
  const { totalAmount, cartItems } = location.state || { totalAmount: 0, cartItems: [] };

  useEffect(() => {
    if (!totalAmount || cartItems.length === 0) {
      navigate("/"); // Redirect to home if there's no valid payment data
    }
  }, [totalAmount, cartItems, navigate]);

  // Handle Payment Submission
  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://project-work-shopvast-2.onrender.com/api/payment", {
        totalAmount,
        cartItems,
      });

      console.log("Payment response:", response.data);
      setPaymentSuccess(true);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
    setLoading(false);
  };

  // Navigate back to Home after successful payment
  const handleHome = () => {
    navigate("/dashboard");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Payment Processing</h1>

      {paymentSuccess ? (
        <div>
          <p style={{ color: "green", fontWeight: "bold" }}>Payment successfully done!</p>
          <button onClick={handleHome}>Go to Home</button>
        </div>
      ) : (
        <>
          <p>Confirm your payment of ₹{totalAmount}</p>
          <button onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentProcessing;
