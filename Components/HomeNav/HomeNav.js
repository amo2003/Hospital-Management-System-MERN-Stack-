import React from 'react';
import { Link } from 'react-router-dom';
import { FaHospital, FaUserPlus, FaUserCircle, FaHome, FaPhone } from 'react-icons/fa';
import './HomeNav.css';

function HomeNav() {
  return (
    <nav className="home-nav">
      <div className="nav-container">
        {/* Logo on the left */}
        <Link to="/mainhome" className="logo-link">
          <FaHospital className="logo-icon" />
          <span className="logo-text">NawalokaHospital</span>
        </Link>

        {/* Nav items on the right */}
        <ul className="nav-menu">
          <li>
            <Link to="/" className="nav-link">
              <FaHome className="nav-icon" /> Home
            </Link>
          </li>
          <li>
            <Link to="/patientlogin" className="nav-link">
              <FaUserPlus className="nav-icon" /> Register as Patient
            </Link>
          </li>
           <li>
            <Link to="/navpanel" className="nav-link">
              <FaUserCircle className="nav-icon" /> Panel
            </Link>
          </li>
          <li>
            <Link to="/adminlogin" className="nav-link">
              <FaUserCircle className="nav-icon" /> Admin
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              <FaPhone className="nav-icon" /> Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default HomeNav;
