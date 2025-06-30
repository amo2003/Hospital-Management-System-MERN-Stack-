// src/components/UpdatePayment.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './UpdatePayment.css';

function UpdatePayment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    amount: "",
    number: "",
    date: ""
  });

  // Fetch existing payment by ID
  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/payments/${id}`);
        setForm(res.data.payment);
      } catch (err) {
        console.log("Error fetching payment:", err);
      }
    };
    fetchPayment();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/payments/${id}`, form);
      alert("Payment updated successfully!");
      navigate("/displaypayment"); // Redirect back to list
    } catch (err) {
      console.log("Update failed:", err);
    }
  };

  return (
    <div className="update-payment-container">
  <h2>Update Payment Details</h2>
  <form onSubmit={handleSubmit} className="update-payment-form">
    <input
      name="name"
      placeholder="Name"
      value={form.name}
      onChange={handleChange}
      required
    />
    <input
      name="amount"
      placeholder="Amount"
      value={form.amount}
      onChange={handleChange}
      required
    />
    <input
      type="password"
      name="number"
      placeholder="card Number"
      value={form.number}
      onChange={handleChange}
      required
    />
    <input
      name="date"
      type="date"
      value={form.date}
      onChange={handleChange}
      required
    />
    <button type="submit">Update</button>
  </form>
</div>

  );
}

export default UpdatePayment;
