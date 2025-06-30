import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserMd, FaUserNurse, FaUserInjured, FaWhatsapp, FaHospital, FaUserShield , FaSignOutAlt, FaCalendarAlt, FaListAlt  } from 'react-icons/fa';
import './Admin.css'; // Updated CSS path

function Admin() {
  const navigate = useNavigate();

  const handleSendReport = () => {
    const phoneNumber = "+94766773745";
    const message = `Hello from Nawaloka Hospital! 📢 Please check your profile on the hospital portal for the latest updates regarding appointments, schedules, and notifications.\n\nIf you have any questions or concerns, feel free to contact our administration. Thank you for being a part of MediCare+.`;

    const WhatsAppUrl = `http://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(WhatsAppUrl, "_blank");
  };

  return (
    <div className="admin-page">
     <nav className="register-navbar">
                <div className="navbar-logo">
                    <FaHospital className="navbar-icon" />
                    <span>Nawaloka Hospital - Admin Dashboard</span>
                </div>
                <div className="nav-links">
                    <Link to="/admin"><FaUserShield  /> Admin Dashboard</Link>
                    <Link to="/mainhome"><FaSignOutAlt /> Logout</Link>
                </div>
            </nav>

      {/* Main Action Cards */}
      <div className="admin-actions">
        <div className="admin-card" onClick={() => navigate('/doctorregister')}>
          <FaUserMd className="card-icon" />
          <h3>Add Doctor</h3>
        </div>

        <div className="admin-card" onClick={() => navigate('/addstaff')}>
          <FaUserNurse className="card-icon" />
          <h3>Add Staff</h3>
        </div>

        <div className="admin-card" onClick={() => navigate('/patientdisplay')}>
          <FaUserInjured className="card-icon" />
          <h3>View Patients</h3>
        </div>


      <div className="admin-card"  onClick={() => navigate('/displayAppointments')}>
          <FaCalendarAlt className="card-icon" />
          <h3>Patient Appointment</h3>
        </div>

          <div className="admin-card" onClick={() => navigate('/displayRegisterdoctor')}>
          <FaUserMd className="card-icon" />
          <h3>View Doctors</h3>
        </div>

          <div className="admin-card" onClick={() => navigate('/staffdetails')}>
          <FaUserNurse className="card-icon" />
          <h3>View Staff</h3>
        </div>

              <div className="admin-card" onClick={() => navigate('/displaypayment')}>
          <FaListAlt  className="card-icon" />
          <h3>View Payment List</h3>
        </div>

           <div className="admin-card" onClick={handleSendReport}>
          <FaWhatsapp className="card-icon whatsapp" />
          <h3>Send WhatsApp</h3>
        </div>
        </div>

      {/* Vision & Mission */}
      <footer className="admin-footer">
        <h3>Our Vision</h3>
        <p>To be the most trusted and respected healthcare provider in the region by offering world-class care with compassion.</p>
        <h3>Our Mission</h3>
        <p>To deliver exceptional medical services through innovation, dedication, and personalized care for all our patients.</p>
      </footer>
    </div>
  );
}

export default Admin;
