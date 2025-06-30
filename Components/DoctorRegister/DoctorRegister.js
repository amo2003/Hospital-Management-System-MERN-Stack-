import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaHospital, FaHome, FaSignOutAlt, FaUserMd, FaPlusCircle, FaCross } from 'react-icons/fa';
import './DoctorRegister.css';

function DoctorRegister() {
    const history = useNavigate();
    const [client, setClient] = useState({
        name: "",
        gmail: "",
        special: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClient((prevClient) => ({ ...prevClient, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => {
            alert("Registration Successful");
            history("/displayRegisterdoctor");
        }).catch((err) => {
            alert(err.message);
        });
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/register", {
            name: String(client.name),
            gmail: String(client.gmail),
            special: String(client.special),
            password: String(client.password),
        }).then((res) => res.data);
    };

    return (
        <div className="register-page">
            <nav className="register-navbar">
                <div className="navbar-logo">
                    <FaHospital className="navbar-icon" />
                    <span>Nawaloka Hospital - Doctor Portal</span>
                </div>
                <div className="nav-links">
                    <Link to="/admin"><FaHome /> Admin Dashboard</Link>
                    <Link to="/mainhome"><FaSignOutAlt /> Logout</Link>
                </div>
            </nav>

            <div className="register-form-container">
                <FaCross className="form-decoration cross" />
                <h1><FaUserMd /> Doctor Registration</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            onChange={handleInputChange} 
                            value={client.name} 
                            placeholder="Dr. John Smith" 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="special">Specialization:</label>
                        <input 
                            type="text" 
                            id="special" 
                            name="special" 
                            onChange={handleInputChange} 
                            value={client.special} 
                            placeholder="Cardiology, Neurology, etc." 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gmail">Email Address:</label>
                        <input 
                            type="email" 
                            id="gmail" 
                            name="gmail" 
                            onChange={handleInputChange} 
                            value={client.gmail} 
                            placeholder="doctor@hospital.com" 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            onChange={handleInputChange} 
                            value={client.password} 
                            placeholder="password" 
                            required 
                        />
                    </div>

                    <button type="submit">
                        <FaPlusCircle /> Register Now
                    </button>
                </form>
            </div>
        </div>
    );
}

export default DoctorRegister;