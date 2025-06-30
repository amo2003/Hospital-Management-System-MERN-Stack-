import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PaymentList.css";

function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all payments
  const fetchPayments = async () => {
    const res = await axios.get("http://localhost:5000/payments");
    setPayments(res.data.payments);
    setFilteredPayments(res.data.payments);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Search filter logic
  useEffect(() => {
    const filtered = payments.filter((payment) =>
      payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.number.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPayments(filtered);
  }, [searchTerm, payments]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      await axios.delete(`http://localhost:5000/payments/${id}`);
      fetchPayments();
    }
  };

  return (
    <div>
      {/* Unique NavBar */}
      <nav className="payment-navbar">
        <div className="logo">💳 Payment Dashboard</div>
        <div className="nav-links">
          <Link to="/mainhome">Home</Link>
          <Link to="/admin">Admin Page</Link>
          <Link to="/mainhome">Logout</Link>
        </div>
      </nav>

      <div className="payment-container">
        <h2>Payment Details List</h2>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search by Name / Amount / Card No..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />


        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Bill Amount</th>
                <th>Card Number No</th>
                <th>Date</th>
                <th>Action Button</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((pay) => (
                <tr key={pay._id}>
                  <td>{pay.name}</td>
                  <td>{pay.amount}</td>
                  <td>{'•'.repeat(pay.number.length)}</td>       {/* 👈 shows as dots */}
                  <td>{pay.date?.substring(0, 10)}</td>
                  <td>

                  {/*  <Link to={`/updatepayment/${pay._id}`}>
                      <button>Edit Details</button>
                    </Link>

                  */}  
                    <button onClick={() => handleDelete(pay._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PaymentList;
