import React, { useState} from "react";
import "./CSS/LoginSignup.css";
import { Link,useNavigate} from "react-router-dom";
import axios from 'axios'
import Alert from '@mui/material/Alert';

const LoginSignup = () => {

  const [inputs,setInputs] = useState({
    username:"",
    Address:"",
    email:"",
    contactNumber:"",
    password:""
  })

  const [err,setError] = useState(null)
  const [successMessage,setSuccessMessage] = useState('');

  const navigate = useNavigate()

  const handleChange = e =>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    setError(null);
  }

  const validateEmail = email => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  };
  

  const handleSubmit = async e =>{
    e.preventDefault()
    if (!inputs.username || !inputs.Address || !inputs.email || !inputs.contactNumber || !inputs.password) {
      setError("All fields are required.");
      return;
    }

   
    if (!validateEmail(inputs.email)) {
      setError("Please enter a valid email address.");
      return;
    }

   
    if (!/^\d{10}$/.test(inputs.contactNumber)) {
      setError("Contact number must be exactly 10 digits.");
      return;
    }
    try{
      console.log("work");
      const res = await axios.post("http://localhost:7000/api/users/register/user",inputs)
      console.log(res);
      setSuccessMessage("Registration successful!");
      setTimeout(() => navigate("/login"), 2000);
      

    }catch(err){
        // console.log(err);
        setError(err.response.data)
    }
  }
  return (
    <div className="loginsignup ">
      <div className="loginsignup-container">
        <h1>Register</h1>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        <form className="loginsignup-fields">
          <input type="text" placeholder="Your Name" name="username"onChange={handleChange} required/>
          <input type="text" placeholder="Address" name="Address"  onChange={handleChange}  required/>
          <input type="email" placeholder="Email" name="email"  onChange={handleChange} required/>
          <input type="text" placeholder="contact number"  name="contactNumber"   onChange={handleChange} required/>
          <input type="password" placeholder="Password" name="password"  onChange={handleChange} required />
        </form>

        <div className="register-footer">
          <div className="loginsignup-agree">
            {err &&<p> {err}</p>}
          </div>
          <button className="register-btn" onClick={handleSubmit}>Register</button>
          <p className="loginsignup-login">
            Already have an Account?
            <span>
              <Link to={"/login"}>Login Here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
