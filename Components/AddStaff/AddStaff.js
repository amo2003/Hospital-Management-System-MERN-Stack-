import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AddStaff.css';

function AddStaff() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    password: "",
    stafftype:"",
    age: "",
    address: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert("Staff added Successfully");
    sendRequest().then(() => history('/staffdetails'));
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/staffs", {
      name: String(inputs.name),
      gmail: String(inputs.gmail),
      password: String(inputs.password),
      stafftype: String(inputs.stafftype),
      age: String(inputs.age),
      address: String(inputs.address),
    }).then(res => res.data);
  };

  return (
    <div className="addstaff-page">
      {/* Unique Navbar */}
      <nav className="addstaff-navbar">
        <Link to="/" className="nav-logo">Nawaloka Hospital</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/displayStaffs">Staff List</Link>
          <Link to="/mainhome">Logout</Link>
        </div>
      </nav>

      {/* Staff Registration Form */}
      <div className="adduser-container">
        <h1 className="adduser">Add Staff Page</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" onChange={handleChange} value={inputs.name} required />

          <label htmlFor="gmail">Gmail:</label>
          <input type="email" id="gmail" name="gmail" onChange={handleChange} value={inputs.gmail} required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" onChange={handleChange} value={inputs.password} required />

          <label htmlFor="stafftype">Job Title:</label>
          <input type="text" id="stafftype" name="stafftype" onChange={handleChange} value={inputs.stafftype} required />

          <label htmlFor="age">Age:</label>
          <input type="text" id="age" name="age" onChange={handleChange} value={inputs.age} required />

          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" onChange={handleChange} value={inputs.address} required />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddStaff;
