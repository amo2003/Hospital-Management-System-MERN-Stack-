// PatientProfile.js
import React, { useEffect, useState } from 'react';
import {
  FaHospital, FaHome, FaSignOutAlt, FaUserAlt, FaHeartbeat, FaDownload
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './PatientProfile.css';

function PatientProfile() {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const storedPatient = localStorage.getItem('registeredPatient');
    if (storedPatient) {
      try {
        const parsedPatient = JSON.parse(storedPatient);
        if (!parsedPatient.patientId) {
          parsedPatient.patientId = `NH-${Math.floor(100000 + Math.random() * 900000)}`;
        }
        parsedPatient.bloodType =
          parsedPatient.bloodType || ['A+', 'B+', 'O+', 'AB+'][Math.floor(Math.random() * 4)];
        parsedPatient.lastVisit = parsedPatient.lastVisit || new Date().toLocaleDateString();
        setPatient(parsedPatient);
      } catch (err) {
        console.error('Invalid JSON in localStorage:', err);
      }
    }
  }, []);

  const downloadAsScreenshotPDF = () => {
    const element = document.getElementById('patient-pdf-content');
    element.classList.add('print-pdf'); // Temporary high-contrast style

    html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Patient_Profile_Screenshot.pdf');

      element.classList.remove('print-pdf'); // Remove temporary style
    });
  };

  if (!patient) {
    return (
      <div className="profile-loading">
        <h2>No profile found</h2>
        <p>Please register or log in to view your profile.</p>
        <Link to="/patientregister" className="register-link">Go to Register</Link>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <nav className="profile-navbar">
        <div className="navbar-logo">
          <FaHospital className="navbar-icon" />
          <span>Nawaloka Hospital PLC</span>
        </div>
        <div className="nav-links">
          <Link to="/mainhome"><FaHome /> Home</Link>
          <Link to="/"><FaSignOutAlt /> Logout</Link>
        </div>
      </nav>

      <div className="profile-card" id="patient-pdf-content">
        <div className="profile-header">
          <div className="profile-avatar">
            <FaUserAlt />
          </div>
          <h2>Welcome, {patient.name}</h2>
        </div>

        <div className="profile-section">
          <h3><FaUserAlt /> Personal Information</h3>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Email:</strong> {patient.gmail}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Address:</strong> {patient.address}</p>
          <p><strong>Contact:</strong> {patient.contact}</p>
        </div>

        <div className="profile-section">
          <h3><FaHeartbeat /> Medical Information</h3>
          <p><strong>Blood Type:</strong> {patient.bloodType}</p>
          <p><strong>Patient ID:</strong> {patient.patientId}</p>
          <p><strong>Last Visit:</strong> {patient.lastVisit}</p>
          <p><strong>Primary Physician:</strong> Dr. {['Smith', 'Johnson', 'Williams', 'Brown'][Math.floor(Math.random() * 4)]}</p>
        </div>
      </div>

      <div className="profile-actions">
        <button onClick={downloadAsScreenshotPDF} className="profile-button screenshot">
          <FaDownload style={{ marginRight: '8px' }} />
          Save as Screenshot PDF
        </button>
        <Link to="/addpayment" className="profile-button">If Details Correct, Process Payment</Link>
        <Link to="/medical-records" className="profile-button secondary">Any issue in details, Contact Hospital</Link>
      </div>
    </div>
  );
}

export default PatientProfile;
