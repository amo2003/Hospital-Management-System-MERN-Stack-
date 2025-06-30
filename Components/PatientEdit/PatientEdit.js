import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHospital, FaHome, FaUserPlus, FaUsers } from 'react-icons/fa';
import './PatientEdit.css';

function PatientEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    name: '',
    gmail: '',
    password: '',
    age: '',
    address: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/getPatient/${id}`)
      .then(res => {
        if (res.data.status === "ok") {
          setPatient(res.data.data);
        } else {
          setError("Patient not found");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching patient:", err);
        setError("Failed to fetch patient");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patient.name || !patient.gmail) {
      alert("Name and Email are required.");
      return;
    }

    axios.put(`http://localhost:5000/updatePatient/${id}`, patient)
      .then(res => {
        if (res.data.status === "ok") {
          alert("Patient updated successfully!");
          navigate("/patientdisplay");
        } else {
          alert("Update failed.");
        }
      })
      .catch(err => {
        console.error("Update error:", err);
        alert("Update failed.");
      });
  };

  if (loading) return <p className="loading-text">Loading patient data...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="patient-edit-container">
      <nav className="edit-navbar">
        <div className="navbar-logo">
          <FaHospital className="navbar-icon" />
          <span>Nawaloka Hospital PLC</span>
        </div>
        <div className="nav-links">
          <Link to="/mainhome"><FaHome /> Home</Link>
          <Link to="/patientregister"><FaUserPlus /> Add Patient</Link>
          <Link to="/patientdisplay"><FaUsers /> View Patients</Link>
        </div>
      </nav>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="edit-form">
          <h2 className="form-title">Edit Patient Details</h2>
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={patient.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="gmail">Email Address</label>
            <input
              type="email"
              id="gmail"
              name="gmail"
              value={patient.gmail}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              value={patient.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={patient.age}
              onChange={handleChange}
              placeholder="Enter age"
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={patient.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={patient.contact}
              onChange={handleChange}
              placeholder="Enter contact"
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Update Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientEdit;