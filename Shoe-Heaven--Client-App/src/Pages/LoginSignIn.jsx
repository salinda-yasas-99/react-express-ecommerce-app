import React, { useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./CSS/LoginSignIn.css";
import axios from 'axios'
import Alert from '@mui/material/Alert';


const LoginSignIn = () => {
  const [inputs,setInputs] = useState({
    username:"",
    password:""
  })

  const [err,setError] = useState(null)
  const [successMessage,setSuccessMessage] = useState('');
  

  const navigate = useNavigate()

  const handleChange = e =>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    setError(null); // Clear error messages when the user starts typing
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!inputs.username.trim() || !inputs.password.trim()) {
      setError("Please provide both username and password.");
      return; // Prevent the form from being submitted
  }
    try {
        const response = await axios.post("http://localhost:7000/api/auth/login", inputs);
        console.log("Response data:", response.data);

        if (response.data.token) {
            localStorage.setItem('access_token', response.data.token);
            setSuccessMessage("Login successful!");
            setTimeout(() => navigate("/"), 2000); 
        } else {
            setError("Failed to retrieve authentication token.");
        }
    } catch (err) {
        console.error(err);
        setError(err.response && err.response.data ? err.response.data : "Login request failed.");
    }
};

  return (
    <div className="loginsignin ">
      <div className="loginsignin-container">
        <h1>Login</h1>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        <form className="loginsignin-fields">
          <input type="text" placeholder="Username" name="username" onChange={handleChange} required/>
          <input type="password" placeholder="Password" name="password" onChange={handleChange} required/>
        </form>
        <div className="login-footer">
          <div className="loginsignin-agree">
            {err &&<p>{err}</p>}
          </div>
          <button onClick={handleSubmit} className="submit-btn" >Continue</button>
          <p className="loginsignin-login">
            Don't you have an Account?
            <span>
              <Link to={"/register"}>Register</Link>
            </span>
          </p>
        </div>
      </div>
      
               
            
    </div>
  );
};

export default LoginSignIn;
