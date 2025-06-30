import React from 'react';
import './ServiceInfo.css';
import { FaBaby } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // ✅ Step 1


// Local or online images (update paths if needed)
import emergencyRoomImg from '../../assets/pe6.jpg';
import pediatricCareImg from '../../assets/pe1.jpg';
import babyCareImg from '../../assets/pe2.jpg';
import pediatricRoomImg from '../../assets/pe3.jpg';
import growthMonitoringImg from '../../assets/pe4.jpg';

function Pediatric() {
  return (
    <div className="service-page">
      <div className="service-banner pediatric-banner">
        <FaBaby size={60} />
        <h1>Pediatric Department</h1>
        <p>Specialized care for infants, children, and adolescents.</p>
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
            <li>Child Immunization Programs</li>
            <li>Nutrition & Growth Monitoring</li>
            <li>Newborn Intensive Care Unit (NICU)</li>
            <li>Developmental & Behavioral Screenings</li>
            <li>Pediatric Emergency Support</li>
            <li>Specialist Pediatric Consultations</li>
            <li>Child-Friendly Examination Rooms</li>
            <li>Care for Chronic Pediatric Illnesses</li>
            <li>Parental Counseling & Support</li>
          </ul>
        </div>
      </div>

      <div className="gallery-section">
        <h2>Pediatric Care Gallery</h2>
        <div className="gallery-grid">
          <img src={pediatricCareImg} alt="Pediatric Specialist Care" />
          <img src={babyCareImg} alt="Baby Care Unit" />
          <img src={pediatricRoomImg} alt="Pediatric Room" />
          <img src={growthMonitoringImg} alt="Growth Monitoring" />
        </div>
      </div>

      <div className="call-to-action">
        <h3>Need Pediatric Consultation?</h3>
        <p>
          Our pediatricians are available for both emergency and scheduled care.
          Call our children’s health support line: <strong>+94 11 234 9876</strong>
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

export default Pediatric;
