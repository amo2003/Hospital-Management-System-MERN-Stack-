import React from 'react';
import './ServiceInfo.css';
import { FaHeartbeat } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Local images (replace with your own assets)
import emergencyRoomImg from '../../assets/ca5.jpg';
import ecgImg from '../../assets/ca1.jpg';
import surgeryImg from '../../assets/ca2.jpg';
import rehabImg from '../../assets/ca3.jpg';
import angiogramImg from '../../assets/ca4.jpg';

function Cardiology() {
  return (
    <div className="service-page">
      <div className="service-banner cardiology-banner">
        <FaHeartbeat size={60} />
        <h1>Cardiology Department</h1>
        <p>Heart health services from prevention to intervention.</p>
      </div>

      <div className="service-content">
        <img
            src={emergencyRoomImg}
             alt="Emergency Room"
            className="service-image"
        />
        <div className="service-description">
          <h2>What We Offer</h2>
          <ul>
            <li>ECG, Echocardiograms & Stress Testing</li>
            <li>Heart Disease Prevention & Monitoring</li>
            <li>Cardiac Catheterization & Angiography</li>
            <li>Pacemaker & ICD Implantation</li>
            <li>Advanced Cardiac Life Support</li>
            <li>24/7 Cardiac Emergency Response</li>
            <li>Cardiac Rehabilitation Programs</li>
            <li>Post-Operative Cardiology Care</li>
          </ul>
        </div>
      </div>

      <div className="gallery-section">
        <h2>Cardiology Facilities Gallery</h2>
        <div className="gallery-grid">
          <img src={ecgImg} alt="ECG and Monitoring" />
          <img src={angiogramImg} alt="Angiography Room" />
          <img src={rehabImg} alt="Cardiac Rehabilitation" />
          <img src={surgeryImg} alt="Cardiology Operation Theatre" />
        </div>
      </div>

      <div className="call-to-action">
        <h3>Need Cardiology Assistance?</h3>
        <p>
          Our expert cardiologists are available for both routine and emergency care. Call us now at <strong>+94 11 445 8899</strong>
        </p>
        <a href="/contact" className="emergency-contact-button">
          Contact Pediatric Services
        </a>
          <div className="cta-buttons">

        <Link to="/" className="emergency-contact-button home-btn">
          Back to Home
        </Link>
      </div>
      </div>
    </div>
  );
}

export default Cardiology;
