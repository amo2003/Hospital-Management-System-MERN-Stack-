import React from "react";
import { FaCheckCircle, FaInfoCircle, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './PaymentSuccess.css';

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="payment-success-overlay">
      <div className="payment-success-popup">
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        
        <h2>Payment Processed Successfully!</h2>
        
        <div className="patient-notes">
          <div className="note-header">
            <FaInfoCircle className="info-icon" />
            <span>Important Information</span>
          </div>
          <ul>
            <li>Your payment receipt has been sent to your email</li>
            <li>Allow 24-48 hours for the transaction to appear in your records</li>
            <li>For insurance claims, keep this transaction ID for reference</li>
            <li>Contact billing support at (555) 123-4567 with any questions</li>
          </ul>
        </div>

        <button 
          className="home-button"
          onClick={() => navigate('/')}
        >
          <FaHome /> Return to Home
        </button>
        
        <div className="success-footer">
          Thank you for your payment
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;