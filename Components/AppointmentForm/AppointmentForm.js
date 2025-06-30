import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AppointmentForm.css";
import { useNavigate } from "react-router-dom";


function AppointmentForm() {
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

  useEffect(() => {
    axios.get("http://localhost:5000/getClients")
      .then((res) => {
        if (res.data.status === "ok") {
          setDoctors(res.data.data);
        }
      });
  }, []);

  const handleDoctorChange = (e) => {
    const selectedId = e.target.value;
    const doctor = doctors.find(d => d._id === selectedId);
    setFormData(prev => ({
      ...prev,
      doctorId: selectedId,
      doctorName: doctor?.name || "",
      specialization: doctor?.special || "",
    }));
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const navigate = useNavigate();


 const handleSubmit = (e) => {
  e.preventDefault();
  axios.post("http://localhost:5000/appointment", formData)
    .then(res => {
      if (res.data.status === "ok") {
        alert("Appointment Booked Successfully!");
        // Reset form
        setFormData({
          doctorId: "",
          doctorName: "",
          specialization: "",
          patientName: "",
          date: "",
          time: "",
          reason: "",
        });
        // Navigate to single appointment detail page
        navigate(`/singleAppointment/${res.data.data._id}`);
      } else {
        alert("Error booking appointment");
      }
    })
    .catch(err => {
      console.error("Appointment error:", err);
      alert("Failed to book appointment");
    });
};


  return (
    <div className="medvault-appointment">
      <nav className="medvault-nav">
        <div className="medvault-nav-container">
          <div className="medvault-nav-brand">
            <svg className="medvault-logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 14C19 15.3261 18.4732 16.5979 17.5355 17.5355C16.5979 18.4732 15.3261 19 14 19H10C8.67392 19 7.40215 18.4732 6.46447 17.5355C5.52678 16.5979 5 15.3261 5 14V10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5H14C15.3261 5 16.5979 5.52678 17.5355 6.46447C18.4732 7.40215 19 8.67392 19 10V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="medvault-logo-text">Nawaloka Hospital</span>
          </div>
          <div className="medvault-nav-menu">
            <a href="/mainhome" className="medvault-nav-item active">
              <svg className="medvault-nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Home</span>
            </a>
            <a href="kkk" className="medvault-nav-item">
              <svg className="medvault-nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Doctors</span>
            </a>
            <a href="kkk" className="medvault-nav-item">
              <svg className="medvault-nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 14H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 18H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Our Services</span>
            </a>
            <a href="/contact" className="medvault-nav-item">
              <svg className="medvault-nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V16.92" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 9C18 7.4087 17.3679 5.88258 16.2426 4.75736C15.1174 3.63214 13.5913 3 12 3C10.4087 3 8.88258 3.63214 7.75736 4.75736C6.63214 5.88258 6 7.4087 6 9V16H18V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Contact Us</span>
            </a>
            <div className="medvault-user-avatar">
              <span className="medvault-user-initials">NH</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="medvault-main-content">
        <div className="medvault-appointment-card">
          <div className="medvault-card-header">
            <h2>Schedule New Appointment</h2>
            <p className="medvault-card-subtitle">Fill in the details to book your medical appointment</p>
          </div>
          
          <form onSubmit={handleSubmit} className="medvault-appointment-form">
            <div className="medvault-form-group">
              <label className="medvault-form-label">Select Doctor</label>
              <div className="medvault-select-wrapper">
                <select 
                  name="doctorId" 
                  onChange={handleDoctorChange} 
                  value={formData.doctorId} 
                  required
                  className="medvault-form-select"
                >
                  <option value="" disabled>-- Select Doctor --</option>
                  {doctors.map(doc => (
                    <option key={doc._id} value={doc._id}>
                      {doc.name} - {doc.special}
                    </option>
                  ))}
                </select>
                <div className="medvault-select-arrow">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="medvault-form-group">
              <label className="medvault-form-label">Specialization</label>
              <input 
                type="text" 
                value={formData.specialization} 
                readOnly 
                className="medvault-form-input"
              />
            </div>

            <div className="medvault-form-group">
              <label className="medvault-form-label">Your Full Name</label>
              <input 
                type="text" 
                name="patientName" 
                value={formData.patientName} 
                onChange={handleChange} 
                required 
                className="medvault-form-input"
                placeholder="John Doe"
              />
            </div>

            <div className="medvault-form-row">
              <div className="medvault-form-group">
                <label className="medvault-form-label">Date</label>
                <div className="medvault-date-input">
                  <input 
                    type="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleChange} 
                    required 
                    className="medvault-form-input"
                  />
                </div>
              </div>
              
              <div className="medvault-form-group">
                <label className="medvault-form-label">Time</label>
                <div className="medvault-time-input">
                  <input 
                    type="time" 
                    name="time" 
                    value={formData.time} 
                    onChange={handleChange} 
                    required 
                    className="medvault-form-input"
                  />
                </div>
              </div>
            </div>

            <div className="medvault-form-group">
              <label className="medvault-form-label">Reason for Visit</label>
              <textarea 
                name="reason" 
                value={formData.reason} 
                onChange={handleChange} 
                required 
                className="medvault-form-textarea"
                placeholder="Describe your symptoms or reason for appointment"
              />
            </div>

            <button type="submit" className="medvault-submit-button">
              <span>Book Appointment</span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AppointmentForm;