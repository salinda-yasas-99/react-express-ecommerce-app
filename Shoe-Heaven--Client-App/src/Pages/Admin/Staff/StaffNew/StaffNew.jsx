import React, { useState } from "react";
import "./StaffNew.css";
import Sidebar from "../../../../Components/Admin-Dashboard/Sidebar/Sidebar";

const StaffNew = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    address: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    
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
            <option value="order_manager">Order Manager</option>
          </select>
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={formValues.address}
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
