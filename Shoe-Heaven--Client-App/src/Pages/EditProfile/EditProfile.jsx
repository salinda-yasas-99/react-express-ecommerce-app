import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";

const EditProfile = () => {
  const [inputs, setInputs] = useState({
    username: "",
    Address: "",
    contactNumber: "",
  });

  const [err, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const uid = localStorage.getItem("uid");
      const authToken = localStorage.getItem("access_token");
      try {
        const authAxios = axios.create({
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true,
        });
        const response = await authAxios.get(
          `http://localhost:7000/api/users/userdetails/${uid}`
        );
        setInputs(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("uid");
    const authToken = localStorage.getItem("access_token");
    try {
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });
      const response = await authAxios.put(
        `http://localhost:7000/api/users/update/${uid}`,
        inputs
      ); // Adjust the endpoint as needed
      setSuccessMessage("Profile updated successfully!");
      // setTimeout(() => navigate("/profile"), 2000); // Redirect to profile page or another page
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  return (
    <div className="user-profile ">
      <div className="user-profile-container">
        <h1>Edit Profile</h1>
        <form className="user-profile-fields" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            name="username"
            value={inputs.username}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Address"
            name="Address"
            value={inputs.Address}
            onChange={handleChange}
            required
          />
          {/* <input
            type="email"
            placeholder="Email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
          /> */}
          <input
            type="text"
            placeholder="Contact Number"
            name="contactNumber"
            value={inputs.contactNumber}
            onChange={handleChange}
            required
          />
          <button type="submit" className="edit-btn">
            Edit
          </button>
        </form>

        {err && <p>{err}</p>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
      </div>
    </div>
  );
};

export default EditProfile;
