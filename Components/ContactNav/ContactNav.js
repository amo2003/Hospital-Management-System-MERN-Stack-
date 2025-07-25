import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaEnvelope, FaHospitalAlt, FaUserMd } from 'react-icons/fa';
import './ContactNav.css';

function CustomNav() {
  return (
    <nav className="contact-navbar">
      <div className="contact-nav-logo">
        <FaHospitalAlt className="nav-icon" />
        Nawaloka Hospital
      </div>
      <div className="contact-nav-links">
        <Link to="/mainhome"><FaHome /> Home</Link>
        <Link to="/contact"><FaEnvelope /> Contact</Link>
        <Link to="/doctors"><FaUserMd /> Doctors</Link>
      </div>
    </nav>
  );
}

export default CustomNav;
