import React, { useState } from "react";
import "./StaffNew.css";
import Sidebar from "../../../../Components/Admin-Dashboard/Sidebar/Sidebar";
import axios from "axios";

const StaffNew = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    Address: "",
    contactNumber: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const authToken = localStorage.getItem("access_token");
    try {
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });
      const response = await authAxios.post(
        "http://localhost:7000/api/users/register/admin",
        formValues
      );

      console.log(response.data);
      alert("User added successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to add user");
    }
  };

  return (
    <div className="staff-new-main">
      {/* <Sidebar /> */}
      <h1>Add Member</h1>

      <div className="staff-new-container">
        <form onSubmit={handleSubmit} className="staff-member-form">
          <input
            type="text"
            placeholder="Name"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={formValues.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="admin">Admin</option>
            <option value="order-manager">Order Manager</option>
          </select>
          <input
            type="text"
            placeholder="Address"
            name="Address"
            value={formValues.Address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Contact Number"
            name="contactNumber"
            value={formValues.contactNumber}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Add Member</button>
        </form>
      </div>
    </div>
  );
};

export default StaffNew;
