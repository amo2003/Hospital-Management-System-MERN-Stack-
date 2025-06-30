import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaUserMd ,FaUsers, FaSearch } from 'react-icons/fa';
import './DisplayRegister.css';

function DisplayRegisterPage() {
  //with serch function--------------------------------
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getClients");
      setClients(res.data.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      alert("Failed to load user data.");
    }
  };

  const filteredClients = clients.filter((client) =>
    Object.values(client).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

 useEffect(() => {
  const hasNoResults = clients.filter((client) =>
    Object.values(client).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  ).length === 0;

  setNoResults(hasNoResults);
}, [searchTerm, clients]);

//delete doctor--------------------------------
 const deleteClient = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(`http://localhost:5000/deleteClient/${id}`);
        alert("Doctor deleted successfully");
        fetchClients();
      } catch (err) {
        console.error("Error deleting doctor:", err);
        alert("Failed to delete doctor.");
      }
    }
  };


  return (
    <div className="display-page">
      <header className="dashboard-header">
        <div className="dashboard-title">Doctor Management System</div>
        <div className="dashboard-actions">
          <button className="dashboard-btn" onClick={() => window.location.href = '/admin'}>
            <FaUsers /> Admin Dashboard
          </button>
        </div>
      </header>

      <div className="user-list">
        <h2><FaUserMd /> Registered Doctors</h2>

        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search doctors by name, specialty or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {noResults ? (
          <div className="empty-state">
            {clients.length === 0 ? 'No doctors found in the system.' : 'No matching doctors found.'}
          </div>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => (
                <tr key={index}>
                  <td><strong>Dr. {client.name}</strong></td>
                  <td>{client.special}</td>
                  <td>{client.gmail}</td>
                  <td>{client.password}</td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => deleteClient(client._id)}
                    >
                      <FaTrash /> Remove
                    </button>
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

export default DisplayRegisterPage;
