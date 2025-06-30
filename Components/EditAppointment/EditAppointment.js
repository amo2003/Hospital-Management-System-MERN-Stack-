import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditAppointment.css"; // Import the CSS file

function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: "",
    doctorName: "",
    specialization: "",
    patientName: "",
    date: "",
    time: "",
    reason: "",
  });

  // Load doctors for dropdown
  useEffect(() => {
    axios.get("http://localhost:5000/getClients")
      .then(res => {
        if (res.data.status === "ok") {
          setDoctors(res.data.data);
        }
      })
      .catch(err => console.error("Doctor load error:", err));
  }, []);

  // Load existing appointment data
  useEffect(() => {
    axios.get(`http://localhost:5000/getAppointment/${id}`)
      .then((res) => {
        if (res.data.status === "ok") {
          setFormData(res.data.data);
        }
      })
      .catch(err => console.error("Error loading appointment:", err));
  }, [id]);

  const handleDoctorChange = (e) => {
    const selectedId = e.target.value;
    const selectedDoctor = doctors.find(doc => doc._id === selectedId);

    setFormData(prev => ({
      ...prev,
      doctorId: selectedId,
      doctorName: selectedDoctor?.name || "",
      specialization: selectedDoctor?.special || "",
    }));
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/updateAppointment/${id}`, formData)
      .then(res => {
        if (res.data.status === "ok") {
          alert("Appointment updated successfully!");
          navigate("/displayAppointments");
        } else {
          alert("Update failed.");
        }
      })
      .catch(err => {
        console.error("Update error:", err);
        alert("Error occurred while updating.");
      });
  };

  return (
    <div className="edit-appointment-uniq-page">
      {/* Premium Glass Navbar */}
      <nav className="edit-appointment-uniq-nav">
        <div className="edit-appointment-uniq-nav-container">
          <a href="/" className="edit-appointment-uniq-nav-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            EliteMed
          </a>
          <div className="edit-appointment-uniq-nav-links">
            <a href="/" className="edit-appointment-uniq-nav-link">Dashboard</a>
            <a href="/displayAppointments" className="edit-appointment-uniq-nav-link active">Appointments</a>
            <a href="/doctors" className="edit-appointment-uniq-nav-link">Specialists</a>
            <a href="/profile" className="edit-appointment-uniq-nav-link">My Profile</a>
          </div>
        </div>
      </nav>

      {/* Main Content with Dark Blue Gradient */}
      <div className="edit-appointment-uniq-bg">
        <div className="edit-appointment-uniq-container">
          <h2>Edit Appointment</h2>
          <form onSubmit={handleSubmit} className="edit-appointment-uniq-form">
            {/* Doctor Dropdown */}
            <label>Select Specialist</label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleDoctorChange}
              required
            >
              <option value="">-- Select Doctor --</option>
              {doctors.map(doc => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.name} - {doc.special}
                </option>
              ))}
            </select>

            <label>Specialization</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              readOnly
            />

            <label>Patient Full Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              placeholder="Enter patient's full name"
            />

            <label>Appointment Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <label>Preferred Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />

            <label>Consultation Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              placeholder="Describe the reason for the appointment..."
            />

            <button type="submit">Update Appointment</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAppointment;