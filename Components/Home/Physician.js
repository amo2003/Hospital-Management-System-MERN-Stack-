import React from 'react';
import './ServiceInfo.css';
import { FaUserMd } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Local images (replace paths as needed)
import emergencyRoomImg from '../../assets/phy5.jpg';
import checkupImg from '../../assets/phy1.jpg';
import consultationImg from '../../assets/phy2.jpg';
import screeningImg from '../../assets/phy3.jpg';
import vaccinationImg from '../../assets/phy4.jpg';

function Physician() {
  return (
    <div className="service-page">
      <div className="service-banner physician-banner">
        <FaUserMd size={60} />
        <h1>General Physician</h1>
        <p>Primary care and medical consultations for all age groups.</p>
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
            <li>Routine Health Checkups</li>
            <li>Chronic Disease Management (e.g. diabetes, hypertension)</li>
            <li>General Medical Consultations</li>
            <li>Preventive Health Screenings</li>
            <li>Vaccinations & Immunizations</li>
            <li>Diet & Lifestyle Counseling</li>
            <li>Referral to Specialists if Needed</li>
            <li>Telemedicine Consultations</li>
            <li>Care for All Age Groups</li>
          </ul>
        </div>
      </div>

      <div className="gallery-section">
        <h2>General Physician Services Gallery</h2>
        <div className="gallery-grid">
          <img src={checkupImg} alt="Routine Checkup" />
          <img src={consultationImg} alt="Doctor Consultation" />
          <img src={screeningImg} alt="Health Screening" />
          <img src={vaccinationImg} alt="Vaccination Service" />
        </div>
      </div>

      <div className="call-to-action">
        <h3>Need to See a Physician?</h3>
        <p>
          Our experienced general physicians are here to help with your health needs. For appointments or walk-ins, call us at <strong>+94 11 223 4455</strong>
        </p>
        <a href="/contact" className="emergency-contact-button">
          Contact Physician Services
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

export default Physician;
