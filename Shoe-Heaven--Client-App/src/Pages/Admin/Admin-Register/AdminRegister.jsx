import React, { useState } from "react";
import "./AdminRegister.css";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import Alert from "@mui/material/Alert";

const AdminRegister = () => {
  //   const [inputs, setInputs] = useState({
  //     username: "",
  //     password: "",
  //   });

  //   const [err, setError] = useState(null);
  //   const [successMessage, setSuccessMessage] = useState("");
  //   const navigate = useNavigate();

  //   //   const navigate =  useNavigate()
  //   const handleChange = (e) => {
  //     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  //     setError(null); // Clear error messages when the user starts typing
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     if (!inputs.email || !inputs.password) {
  //       setError("Please provide both Email and password.");
  //       return; // Prevent the form from being submitted
  //     }
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:7000/api/auth/login/user",
  //         inputs
  //       );
  //       console.log("Response data:", response.data);
  //       const { token } = response.data;
  //       if (token) {
  //         const decodedToken = jwtDecode(token);
  //         localStorage.setItem("access_token", token);
  //         localStorage.setItem("uid", decodedToken.userId);
  //         localStorage.setItem("username", decodedToken.username);
  //         console.log(decodedToken);
  //         setSuccessMessage("Login successful!");
  //         setTimeout(() => navigate("/dashboard"), 2000);
  //       } else {
  //         setError("Failed to retrieve authentication token.");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       setError(
  //         err.response && err.response.data
  //           ? err.response.data
  //           : "Login request failed."
  //       );
  //     }
  //   };
  return (
    <div className="admin-register">
      <h1> Admin Panal User Register</h1>
      {/* {successMessage && <Alert severity="success">{successMessage}</Alert>} */}
      <form action="" className="admin-form">
        <input
          type="text"
          placeholder="name"
          name="name"
          //   onChange={handleChange}
          required
        />

        <select name="role" required>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="order_manager">Order Manager</option>
        </select>

        <input
          type="text"
          placeholder="email"
          name="email"
          //   onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          //   onChange={handleChange}
          required
        />
        <button>Register</button>

        <span>
          Already Have an Account? <Link to="/dashboard/adminLogin">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default AdminRegister;
