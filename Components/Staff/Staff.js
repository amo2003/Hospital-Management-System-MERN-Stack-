import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Staff.css'

function Staff(props) {
  const {_id,name,gmail,password,stafftype,age,address} = props.staff;

  //delete user--------
  const history = useNavigate();

const deleteHandler = async() => {
      const staffConfirmed = window.confirm(
        "Are you sure want to delete this staff?"
      );
      if(staffConfirmed){
        try{
          await axios.delete(`http://localhost:5000/staffs/${_id}`);
          window.alert("User Details deleted successful");
          history("/staffdetails");
          window.location.reload();
        }catch(error){
          console.log("Error deleting user details")
        }
      }

   
  };
  //-------------------------------------

  return (
    <div  className="user-card">
      <div className="user-display-title">STAFF MEMBER DETAILS</div>
      <div className="user-field">ID: {_id}</div>
       <div className="user-field">Name: {name}</div>
       <div className="user-field">Gmail: {gmail}</div>
      <div className="user-field">Password: {password}</div>
      <div className="user-field">Job Title: {stafftype}</div>
      <div className="user-field">Age: {age}</div>
      <div className="user-field">Address: {address}</div>

      <div className="user-buttons">
      <button className="update-button"><Link to ={`/staffdetails/${_id}`}>Update</Link></button>
      <button className="delete-button" onClick={deleteHandler}>Delete</button>
      </div>
     
</div>

  );
}

export default Staff;

