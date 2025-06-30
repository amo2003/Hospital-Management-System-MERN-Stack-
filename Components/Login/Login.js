import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { FaHospital, FaUserShield } from 'react-icons/fa';
import './Login.css';

function Login() {
    const history = useNavigate();
    const [client, setClient] = useState({
        gmail: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setClient((prevClient) => ({...prevClient,[name]:value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await sendRequest();
            if(response.err === "ok") {
                alert("Login Success");
                history("/displaytoD");
            } else {
                alert("Login error");
            }
        } catch(err) {
            alert("Error: " + err.message);
        }
    };
        
    const sendRequest = async() => {
        return await axios
        .post("http://localhost:5000/login", {
            gmail: client.gmail,
            password: client.password,
        }).then((res) => res.data);
    };

  return (
    <div className="login-page-wrapper">
      <div className="login-form-card">
        <div className="hospital-brand">
          <FaHospital className="hospital-icon" />
          <h2>MediCare+</h2>
          <p className="pa">Nawaloka Hospital PLC</p>
        </div>
        
        <h1><FaUserShield /> Doctor Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="gmail">Email Address</label>
            <input 
              type="email" 
              id="gmail" 
              name="gmail" 
              onChange={handleInputChange} 
              value={client.gmail} 
              placeholder="Enter your email"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              onChange={handleInputChange} 
              value={client.password} 
              placeholder="Enter your password"
              required 
            />
            <div className="forgot-password">
              <a href="/forgot-password">Forgot password?</a>
            </div>
          </div>
          
          <button type="submit">Login</button>
          
         {/* <div className="signup-link">
            Don't have an account? <a href="/doctorregister">Request access</a>
          </div>  */}
        </form>
      </div>
    </div>
  );
}

export default Login;