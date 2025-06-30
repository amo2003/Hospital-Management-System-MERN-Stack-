import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import './SingleAppointment.css';

function SingleAppointment() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/getAppointment/${id}`)
      .then(res => {
        if (res.data.status === "ok") {
          setAppointment(res.data.data);
        } else {
          alert("Appointment not found");
        }
      })
      .catch(err => {
        console.error("Error fetching appointment:", err);
        alert("Something went wrong!");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="single-loading">Loading...</div>;

  if (!appointment) return <div>No appointment data found.</div>;

  return (
    <div className="single-appointment-container">
      {/* Custom NavBar */}
      <nav className="single-nav-bar">
        <Link to="/" className="nav-logo">Nawaloka Hospital</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/bookappointment">Appointments</Link>
          <Link to="/displayRegisterdoctor">Doctors</Link>
          <Link to="/mainhome">Logout</Link>
        </div>
      </nav>

      {/* Appointment Confirmation Section */}
      <h2>Appointment Confirmation</h2>
      <div className="appointment-card">
        <p><strong>Doctor Name:</strong> {appointment.doctorName}</p>
        <p><strong>Specialization:</strong> {appointment.specialization}</p>
        <p><strong>Patient Name:</strong> {appointment.patientName}</p>
        <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {appointment.time}</p>
        <p><strong>Reason:</strong> {appointment.reason}</p>
      </div>

      {/* Action Buttons */}
      <div className="button-group">
        <Link to="/contact">
          <button>Contact Hospital</button>
        </Link>
        <Link to="/addpayment">
          <button>Confirm & Pay</button>
        </Link>
      </div>
    </div>
  );
}

export default SingleAppointment;
