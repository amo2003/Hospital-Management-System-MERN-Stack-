import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { FaHospital, FaUserShield } from 'react-icons/fa';

function LoginStaff() {
    const history = useNavigate();
    const [staff, setStaff] = useState({
        gmail: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setStaff((prevStaff) => ({...prevStaff,[name]:value}));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await sendRequest();
            if(response.err === "ok") {
                alert("Login Success");
                history("/worklist");
            } else {
                setError("Login error - Please check your credentials");
            }
        } catch(err) {
            setError("Error: " + err.message);
        }
    };
        
    const sendRequest = async() => {
        return await axios
        .post("http://localhost:5000/Staffs/logins", {
            gmail: staff.gmail,
            password: staff.password,
        }).then((res) => res.data);
    };

    return (
        <div className="hms-login-container">
            <div className="hms-login-card">
                <div className="hms-brand-section">
                    <FaHospital className="hms-brand-icon" />
                    <h2 className="hms-brand-title">MediCare+</h2>
                    <p className="hms-brand-subtitle">Nawaloka Hospital PLC</p>
                </div>
                
                <h1 className="hms-login-header">
                    <FaUserShield className="hms-login-icon" /> STAFF Login
                </h1>
                
                {error && <div className="hms-error-message">{error}</div>}
                
                <form className="hms-login-form" onSubmit={handleSubmit}>
                    <div className="hms-form-group">
                        <label className="hms-form-label" for="gmail">Email Address</label>
                        <input 
                            className="hms-form-input"
                            type="email" 
                            id="gmail" 
                            name="gmail" 
                            onChange={handleInputChange} 
                            value={staff.gmail} 
                            placeholder="Enter your email"
                            required 
                        />
                    </div>
                    
                    <div className="hms-form-group">
                        <label className="hms-form-label" for="password">Password</label>
                        <input 
                            className="hms-form-input"
                            type="password" 
                            id="password" 
                            name="password" 
                            onChange={handleInputChange} 
                            value={staff.password} 
                            placeholder="Enter your password"
                            required 
                        />
                        <div className="hms-forgot-link">
                            <a href="/forgot-password">Forgot password?</a>
                        </div>
                    </div>
                    
                    <button type="submit" className="hms-submit-btn">Login</button>
                    
                   {/* <div className="hms-signup-section">
                        Don't have an account? <a className="hms-signup-link" href="/addstaff">Register Here</a>
                    </div> */}
                </form>
            </div>
        </div>
    );
}

export default LoginStaff;