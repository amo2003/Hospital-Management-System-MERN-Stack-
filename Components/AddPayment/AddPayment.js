import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './AddPayment.css';

function AddPayment() {
  const [inputs, setInputs] = useState({
    name: "",
    amount: "",
    number: "",
    date: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/payments", inputs);
      const paymentId = res.data.payment._id;
      alert("Payment Added Successfully");
      navigate(`/singlepayment/${paymentId}`);
    } catch (err) {
      alert("Error adding payment");
      console.error(err);
    }
  };

  return (
    <div className="add-payment-container">
      <h2>Process Payment</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            placeholder="John Doe" 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="amount">Amount</label>
          <input 
            type="number" 
            id="amount"
            name="amount" 
            placeholder="500.00" 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="number">Card Number</label>
          <input 
            type="text" 
            id="number"
            name="number" 
            placeholder="1234-5678-2344-5672" 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="date">Date</label>
          <input 
            type="date" 
            id="date"
            name="date" 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <button type="submit">Add Payment</button>
      </form>
    </div>
  );
}

export default AddPayment;