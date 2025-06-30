import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './UpdatePaymentP.css'

function UpdatePaymentP() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState({
    name: "",
    amount: "",
    number: "",
    date: ""
  });

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/payments/${id}`);
        const p = res.data.payment;
        console.log("Fetched payment:", p); // 🔍 Check if data is fetched
        setPayment({
          name: p.name || "",
          amount: p.amount || "",
          number: p.number || "",
          date: p.date ? p.date.substring(0, 10) : ""
        });
      } catch (err) {
        console.error("Error fetching payment:", err);
        alert("Payment not found or server error");
      }
    };
    fetchPayment();
  }, [id]);

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/payments/${id}`, payment);
      alert("Payment updated successfully!");
      navigate(`/singlepayment/${id}`);
    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed");
    }
  };

  return (
    <div className="update-payment-container">
      <h2>Update Payment</h2>
      <form onSubmit={handleUpdate} className="update-form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={payment.name}
          onChange={handleChange}
          required
        />

        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={payment.amount}
          onChange={handleChange}
          required
        />

        <label>Card Number:</label>
        <input
          type="text"
          name="number"
          value={payment.number}
          onChange={handleChange}
          required
        />

        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={payment.date}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-submit">Update Payment</button>
      </form>
    </div>
  );
}

export default UpdatePaymentP;
