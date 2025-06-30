import React from 'react';
import './ServiceInfo.css';
import { FaBrain } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Local images (replace with actual paths or hosted URLs)
import emergencyRoomImg from '../../assets/ne5.webp';
import mriImg from '../../assets/ne1.jpg';
import rehabImg from '../../assets/ne2.jpg';
import clinicImg from '../../assets/ne3.jpg';
import surgeryImg from '../../assets/ne4.jpg';

function Neurology() {
  return (
    <div className="service-page">
      <div className="service-banner neurology-banner">
        <FaBrain size={60} />
        <h1>Neurology Department</h1>
        <p>Advanced diagnostics and treatment for neurological conditions.</p>
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
            <li>EEG, CT & MRI Scans</li>
            <li>Stroke Diagnosis, Treatment & Rehabilitation</li>
            <li>Care for Parkinson’s, Alzheimer’s & Multiple Sclerosis</li>
            <li>Epilepsy & Headache Management Clinics</li>
            <li>Neurophysiology & Electromyography (EMG)</li>
            <li>Pre/Post-Operative Neurological Care</li>
            <li>Specialist Neurological Surgery Support</li>
            <li>Balance, Memory & Sleep Disorder Treatments</li>
          </ul>
        </div>
      </div>

      <div className="gallery-section">
        <h2>Neurology Facilities Gallery</h2>
        <div className="gallery-grid">
          <img src={mriImg} alt="MRI & Diagnostic Tools" />
          <img src={rehabImg} alt="Stroke Rehabilitation" />
          <img src={clinicImg} alt="Epilepsy Clinic" />
          <img src={surgeryImg} alt="Neurological Surgery Room" />
        </div>
      </div>

      <div className="call-to-action">
        <h3>Need Neurology Support?</h3>
        <p>
          Our Neurology Department offers comprehensive care for all brain and nervous system conditions. Call our neuro helpline at <strong>+94 11 334 7890</strong>
        </p>
        <a href="/contact" className="emergency-contact-button">
          Contact Neurological Services
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

export default Neurology;
