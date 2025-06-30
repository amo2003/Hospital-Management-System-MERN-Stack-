import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DisplayAppointment.css";

function DisplayAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/appointments")
      .then((res) => {
        if (res.data.status === "ok") {
          setAppointments(res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      axios.delete(`http://localhost:5000/deleteAppointment/${id}`)
        .then((res) => {
          if (res.data.status === "ok") {
            setAppointments(prev => prev.filter(appt => appt._id !== id));
          }
        })
        .catch((err) => {
          console.error("Delete error:", err);
          alert("Failed to delete appointment");
        });
    }
  };

  return (
    <div className="uniq-appointments-page">
      {/* Navbar */}
      <nav className="display-appointments-nav">
        <Link to="/" className="display-appointments-nav-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          Nawaloka Hospital - Appointment Portal
        </Link>
        <div className="display-appointments-nav-links">
          <Link to="/" className="display-appointments-nav-link">Home</Link>
          <Link to="/displaytoD" className="display-appointments-nav-link active">Appointments</Link>
          <Link to="/displayRegisterdoctor" className="display-appointments-nav-link">Doctors Details</Link>
          <Link to="/mainhome" className="display-appointments-nav-link">Logout</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="appointment-list-container">
        <h2>All Appointments Details</h2>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by doctor, patient, specialization or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <table className="appointment-table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Patient</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Action Buttons</th>
            </tr>
          </thead>
          <tbody>
            {appointments
              .filter((appt) => {
                const search = searchTerm.toLowerCase();
                return (
                  appt.doctorName?.toLowerCase().includes(search) ||
                  appt.patientName?.toLowerCase().includes(search) ||
                  appt.specialization?.toLowerCase().includes(search) ||
                  new Date(appt.date).toLocaleDateString().includes(search)
                );
              })
              .map((appt) => (
                <tr key={appt._id}>
                  <td>{appt.doctorName}</td>
                  <td>{appt.specialization}</td>
                  <td>{appt.patientName}</td>
                  <td>{new Date(appt.date).toLocaleDateString()}</td>
                  <td>{appt.time}</td>
                  <td>{appt.reason}</td>
                  <td>
                    <Link to={`/editAppointment/${appt._id}`} className="edit-btn">Edit</Link>
                    <button onClick={() => handleDelete(appt._id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplayAppointments;
