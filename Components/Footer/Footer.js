import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhoneAlt, FaHospital } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <FaHospital className="footer-logo" />
          <div>
            <h3 className="footer-title">Nawaloka Hospital PLC</h3>
            <p className="footer-tagline">Your Partner in Health and Wellness</p>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-list">
              <li><a href="/mainhome">Home</a></li>
              <li><a href="/bookappointment">Book Appointment</a></li>
              <li><a href="/patientregister">Register as Patient</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-list">
              <li><FaPhoneAlt className="footer-icon" /> +1 (123) 456-7890</li>
              <li><FaEnvelope className="footer-icon" /> nawalokainfo@medicareplus.com</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="footer-socials">
              <a href="amod" aria-label="Facebook"><FaFacebook /></a>
              <a href="amod" aria-label="Twitter"><FaTwitter /></a>
              <a href="amod_5_2" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} MediCare+ Nawaloka Hospital Management. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;