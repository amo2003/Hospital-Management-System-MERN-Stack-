import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaHospital, FaHome, FaUsers, FaSearch } from 'react-icons/fa';
import './PatientDisplay.css';

function PatientDisplay() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getPatients");
      setPatients(res.data.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      alert("Failed to load patient data.");
    }
  };

  const deletePatient = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await axios.delete(`http://localhost:5000/deletePatient/${id}`);
        alert("Patient deleted successfully");
        fetchPatients();
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user.");
      }
    }
  };

  // Filter patients based on search input
  const filteredPatients = patients.filter((patient) =>
    Object.values(patient).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

 useEffect(() => {
   const hasNoResults = patients.filter((patient) =>
     Object.values(patient).some((field) =>
       field.toString().toLowerCase().includes(searchTerm.toLowerCase())
     )
   ).length === 0;
 
   setNoResults(hasNoResults);
 }, [searchTerm, patients]);

  return (
    <div className="patient-display-container">
      <nav className="custom-patient-navbar">
        <div className="logo-wrapper">
          <FaHospital className="logo-icon" />
          <div className="logo">Nawaloka Hospital PLC</div>
        </div>
        <div className="nav-links">
          <Link to="/mainhome"><FaHome /> Home</Link>
          <Link to="/admin"><FaUsers />Admin Page</Link>
          <Link to="/patientdisplay"><FaUsers /> View Patients</Link>
        </div>
      </nav>

      <div className="patient-table-wrapper">
        <h2>Registered Patients Details</h2>

        {/* 🔍 Search input */}
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search patients by name, email, or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* 🧾 Conditional message */}
        {noResults ? (
          <p>No matching patients found.</p>
        ) : filteredPatients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <table className="styled-patient-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Patient Gmail</th>
                <th>Password</th>
                <th>Patient Age</th>
                <th>Patient Address</th>
                <th>Patient Contact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.name}</td>
                  <td>{patient.gmail}</td>
                  <td>{patient.password}</td>
                  <td>{patient.age}</td>
                  <td>{patient.address}</td>
                  <td>{patient.contact}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deletePatient(patient._id)}>Delete Details</button>
                    <Link to={`/patientedit/${patient._id}`}>
                      <button className="edit-btn">Edit Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PatientDisplay;
