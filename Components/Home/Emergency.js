import React from 'react';
import './ServiceInfo.css';
import { FaAmbulance } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // ✅ Step 1

// Local image imports
import emergencyRoomImg from '../../assets/emer.1.jpg';
import ambulanceImg from '../../assets/doc.jpg';
import erWardImg from '../../assets/emr.4.jpg';
import equipmentImg from '../../assets/emr.2.jpg';
import patientCareImg from '../../assets/emr3.jpg';

function Emergency() {
  return (
    <div className="service-page">
      <div className="service-banner emergency-banner">
        <FaAmbulance size={60} />
        <h1>Emergency Department</h1>
        <p>24/7 critical care for trauma, accidents, and urgent health issues.</p>
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
            <li>24/7 Emergency Room Availability</li>
            <li>Advanced Life Support Systems</li>
            <li>Experienced Trauma Care Team</li>
            <li>Ambulance Services</li>
            <li>Quick Diagnosis & Triage</li>
            <li>Dedicated Resuscitation Bays</li>
            <li>On-call Specialists for Critical Surgeries</li>
            <li>State-of-the-Art Monitoring Equipment</li>
            <li>Separate Pediatric Emergency Unit</li>
            <li>Fast Track for Minor Injuries</li>
          </ul>
        </div>
      </div>

      <div className="gallery-section">
        <h2>Emergency Facilities Gallery</h2>
        <div className="gallery-grid">
          <img src={ambulanceImg} alt="Ambulance Service" />
          <img src={erWardImg} alt="ER Ward" />
          <img src={equipmentImg} alt="Emergency Equipment" />
          <img src={patientCareImg} alt="Patient Care" />
        </div>
      </div>

      <div className="call-to-action">
        <h3>Need Emergency Assistance?</h3>
        <p>
          Our emergency department is ready 24/7. If you need immediate care,
          call our hotline: <strong>+94 11 234 5678</strong>
        </p>


        <a href="/contact" className="emergency-contact-button">
          Contact Emergency Services
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

export default Emergency;
