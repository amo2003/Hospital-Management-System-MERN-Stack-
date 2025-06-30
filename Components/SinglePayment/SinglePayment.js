import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import './SinglePayment.css';

function SinglePayment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/payments/${id}`);
        setPayment(res.data.payment);
      } catch (err) {
        console.error("Error fetching payment:", err);
        alert("Payment not found");
      }
    };
    fetchPayment();
  }, [id]);

  if (!payment) return <p className="loading-text">Loading...</p>;

  return (
    <div className="single-payment-container">
      <h2 className="single-payment-header">Payment Details</h2>

      <div className="payment-detail"><strong>Name:</strong> {payment.name}</div>
      <div className="payment-detail"><strong>Amount:</strong> {payment.amount}</div>
      <div className="payment-detail"><strong>Card Number:</strong> {payment.number}</div>
      <div className="payment-detail"><strong>Date:</strong> {payment.date?.substring(0, 10)}</div>

      <div className="button-group">
       <button className="btn btn-success" onClick={() => navigate(`/paymentsuccess`)}>
  <FaCheck /> Confirm Details
</button>

<button className="btn btn-danger" onClick={() => navigate(`/updatepaymentp/${id}`)}>
  <FaExclamationTriangle /> Edit Details
</button>

      </div>
    </div>
  );
}

export default SinglePayment;
