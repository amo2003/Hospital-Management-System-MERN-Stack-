import React, { useEffect, useRef, useState } from 'react';
import StaffNav from '../StaffNav/StaffNav';
import axios from "axios";
import Staff from '../Staff/Staff';
import {useReactToPrint} from "react-to-print";
import { FaWhatsapp, FaFilePdf } from 'react-icons/fa';

const URL = "http://localhost:5000/staffs";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function Staffs() {
  const [staffs, setStaffs] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setStaffs(data.staffs));
  },[])

  //details pdf downloard

  const componentRef = useRef();

 const handlePrint = useReactToPrint({
  documentTitle: "User Report",
  contentRef: componentRef,  // <-- use contentRef
  onAfterPrint: () => alert("Download complete!"),
});

//---------------------------------

//details search -----------------

  const [searchQuery, setSerarchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredStaffs = data.staffs.filter((client) => 
      Object.values(client).some((field) => 
      field.toString().toLowerCase().includes(searchQuery.toLocaleLowerCase())
      ))
      setStaffs(filteredStaffs);
      setNoResults(filteredStaffs.length === 0);
    });
  };

  //--------------------------------------------------

  //send details in whasapp

  const handleSendReport = () => {
    //crete whatsapp chat url
    const phoneNumber = "+94766773745";
    const message = `Hello what you want to know`
    const WhatsAppUrl = `http://web.whatsapp.com/send?phones=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    
    //open the whatsapp chat in new window
    window.open(WhatsAppUrl,"_blank");
  }


  return (
    <div><StaffNav/>
    <div className="users-page">
      <div className="users-container">

    <div className="users-title">
      <h1>ALL STAFF DETAILS</h1>

      <input  className="search-input" onChange={(e) => setSerarchQuery(e.target.value)}
      type="text"
      name="search"
      placeholder="Search user details">
      </input>

      <button className="search-button" onClick={handleSearch}>Serach Details</button>

      {noResults ? (
        <div className="no-results">
          <p>No users Found</p>
        </div>
      ): (

      <div ref={componentRef} className="users-list">
        {staffs && staffs.map((staff, i) => (
          <div key={i}>
            <Staff staff={staff}/>
          </div>
        ))}
      </div>
      )}
<button className="download-button" onClick={handlePrint}>
  <span style={{ marginRight: "8px" }}><FaFilePdf /></span> Download Report
</button>

<button className="whatsapp-button" onClick={handleSendReport}>
  <span style={{ marginRight: "8px" }}><FaWhatsapp /></span> Send WhatsApp Message
</button>

    </div>
    </div>
    </div>
    </div>
  );
}

export default Staffs;
