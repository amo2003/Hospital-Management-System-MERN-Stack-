import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavigationPanel.css";
import { FaHospital } from 'react-icons/fa';

function NavigationPanel() {
  const navigate = useNavigate();

  return (
    <div className="np-container">
      <FaHospital size={24} color="blue" />
      <h2>Nawaloka Hospital Management System</h2>
      <p>Welcome! Choose one of the actions below:</p>

      <div className="np-buttons">
        <button onClick={() => navigate("/login")}>Access for Doctors</button>
        <button onClick={() => navigate("/loginstaff")}>Access for Staff</button>
      </div>
    </div>
  );
}

export default NavigationPanel;
