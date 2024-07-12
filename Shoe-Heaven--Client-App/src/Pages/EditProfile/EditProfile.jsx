import React,{useState} from 'react'
import './EditProfile.css'
import { Link,useNavigate} from "react-router-dom";
// import axios from 'axios'
// import Alert from '@mui/material/Alert';

const EditProfile = () => {

//   const [inputs,setInputs] = useState({
//     username:"",
//     address:"",
//     email:"",
//     contact_number:"",
    
//   })

//   const [err,setError] = useState(null)
//   const [successMessage,setSuccessMessage] = useState('');

//   const navigate = useNavigate()

//   const handleChange = e =>{
//     setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
//     setError(null);
//   }

//   const handleSubmit = async e =>{
//     e.preventDefault()
//     try{
//       console.log("work");
//       const res = await axios.post("http://localhost:7000/api/auth/register",inputs)
//       console.log(res);
//       setSuccessMessage("Registration successful!");
//       setTimeout(() => navigate("/login"), 2000);
      

//     }catch(err){
//         console.log(err);
//         setError(err.response.data)
//     }
//   }
  return (
    <div className="user-profile ">
      <div className="user-profile-container">
        <h1>Edit Profile</h1>
        {/* {successMessage && <Alert severity="success">{successMessage}</Alert>} */}
        <form className="user-profile-fields">
          <input type="text" placeholder="Your Name" name="username" required/>
          <input type="text" placeholder="Address" name="address"   required/>
          <input type="email" placeholder="Email" name="email"   required/>
          <input type="text" placeholder="contact number"  name="contact_number"   required/>
         
        </form>

        <div className="user-profile-footer">
          <div className="user-profile-agree">
            {/* {err &&<p> {err}</p>} */}
          </div>
          <button className="edit-btn" >Edit</button>
          
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

