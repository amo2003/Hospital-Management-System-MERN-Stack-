import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { FaHospital, FaUserShield } from 'react-icons/fa';
import './LoginPatient.css';

function LoginPatient() {
  const history = useNavigate();
  const [patient, setPatient] = useState({
    gmail: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest();

      if (response.err === "ok") {
        if (response.data) {
          // ✅ Save logged-in patient info to localStorage
          localStorage.setItem("registeredPatient", JSON.stringify(response.data));
        }
        alert("Login Success");
        history("/patientprofile");
      } else {
        setError("Login error - " + response.err);
      }
    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  const sendRequest = async () => {
    const res = await axios.post("http://localhost:5000/log", {
      gmail: patient.gmail,
      password: patient.password,
    });
    return res.data; // { err: "ok", data: {...} } OR { err: "client Not found" }
  };

  return (
    <div className="hms-login-container">
      <div className="hms-login-card">
        <div className="hms-brand-section">
          <FaHospital className="hms-brand-icon" />
          <h2 className="hms-brand-title">MediCare+</h2>
          <p className="hms-brand-subtitle">Nawaloka Hospital PLC</p>
        </div>

        <h1 className="hms-login-header">
          <FaUserShield className="hms-login-icon" /> Patient Login
        </h1>

        {error && <div className="hms-error-message">{error}</div>}

        <form className="hms-login-form" onSubmit={handleSubmit}>
          <div className="hms-form-group">
            <label className="hms-form-label" htmlFor="gmail">Email Address</label>
            <input
              className="hms-form-input"
              type="email"
              id="gmail"
              name="gmail"
              onChange={handleInputChange}
              value={patient.gmail}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="hms-form-group">
            <label className="hms-form-label" htmlFor="password">Password</label>
            <input
              className="hms-form-input"
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
              value={patient.password}
              placeholder="Enter your password"
              required
            />
            <div className="hms-forgot-link">
              <a href="/forgot-password">Forgot password?</a>
            </div>
          </div>

          <button type="submit" className="hms-submit-btn">Login</button>

          <div className="hms-signup-section">
            Don't have an account? <a className="hms-signup-link" href="/patientregister">Register Here</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPatient;
