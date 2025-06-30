import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaHospital, FaHome, FaPhone, FaSignOutAlt } from 'react-icons/fa';
import './PatientRegister.css';

function PatientRegister() {
  const history = useNavigate();
  const [patient, setPatient] = useState({
    name: "",
    gmail: "",
    password: "",
    age: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({ ...prevPatient, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/patientregister", {
        name: String(patient.name),
        gmail: String(patient.gmail),
        password: String(patient.password),
        age: String(patient.age),
        address: String(patient.address),
        contact: String(patient.contact),
      });

      const resData = res.data;

      if (resData.status === "ok") {
        localStorage.setItem("registeredPatient", JSON.stringify(resData.data)); // ✅ Store the patient
        alert("Register Success");
        history("/patientlogin"); // ✅ Redirect to profile
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      alert("Error during registration: " + err.message);
    }
  };

  return (
    <div className="register-page">
      {/* Reusable NavBar */}
      <nav className="edit-navbar">
        <div className="navbar-logo">
          <FaHospital className="navbar-icon" />
          <span>Nawaloka Hospital PLC</span>
        </div>
        <div className="nav-links">
          <Link to="/mainhome"><FaHome /> Home</Link>
          <Link to="/contact"><FaPhone />Contact Us</Link>
          <Link to="/mainhome"><FaSignOutAlt /> Log Out</Link>
        </div>
      </nav>

      <div className="register-form-container">
        <h1>Patient Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Patient Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            value={patient.name}
            required
          />

          <label htmlFor="gmail">Patient Gmail:</label>
          <input
            type="email"
            id="gmail"
            name="gmail"
            onChange={handleInputChange}
            value={patient.gmail}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}
            value={patient.password}
            required
          />

          <label htmlFor="age">Patient Age:</label>
          <input
            type="text"
            id="age"
            name="age"
            onChange={handleInputChange}
            value={patient.age}
            required
          />

          <label htmlFor="address">Patient Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={handleInputChange}
            value={patient.address}
            required
          />

           <label htmlFor="contact">Patient Contact:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            onChange={handleInputChange}
            value={patient.contact}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default PatientRegister;
