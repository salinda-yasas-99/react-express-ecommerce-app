import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";

import { getAllAdmins } from "../../../Services/RestApiCalls";
import axios from "axios";

const StaffDataTable = () => {
  const [staffData, setStaffData] = useState([]);
  const [currentStaff, setCurrentStaff] = useState({
    username: "JohnDoe",
    email: "john@example.com",
    password: "password123",
    address: "123 Main St",
    contact_number: "1234567890",
  });

  const [open, setOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStaff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenDialog = (staff) => {
    setCurrentStaff(staff);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const fetchUsers = async () => {
    const users = await getAllAdmins();
    setStaffData(users);
    console.log("This is users", staffData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userIdToDelete) => {
    if (userIdToDelete) {
      const authToken = localStorage.getItem("access_token");
      try {
        const authAxios = axios.create({
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true,
        });
        const response = await authAxios.delete(
          `http://localhost:7000/api/users/delete/${userIdToDelete}`
        );
        console.log(response.data);
        fetchUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleAddNewStaffClick = (e) => {
    const role = localStorage.getItem("role");
    if (role === "order-manager") {
      alert("You are not authorized to perform this action");
      e.preventDefault();
    }
  };

  return (
    <div className="staff-management">
      <h2 style={{ padding: "20px 0 30px" }}>Staff Management</h2>
      <div className="add-member">
        <Link
          to="/dashboard/staff/new"
          style={{
            textDecoration: "none",
            color: "green",
            fontSize: "16px",
            border: "1px solid green",
            padding: "5px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleAddNewStaffClick}
        >
          Add New
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="staff table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffData.map((staff, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {staff.username}
                </TableCell>
                <TableCell align="center">{staff.role}</TableCell>
                <TableCell align="center">{staff.address}</TableCell>
                <TableCell align="center">{staff.email}</TableCell>
                <TableCell align="center">
                  <button
                    style={{
                      border: "1px solid blue",
                      color: "blue",
                      background: "white",
                      borderRadius: "5px",
                      padding: "10px 15px",
                      fontWeight: "500",
                    }}
                    onClick={() => handleOpenDialog(staff)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      border: "1px solid red",
                      color: "red",
                      background: "white",
                      borderRadius: "5px",
                      padding: "10px 15px",
                      fontWeight: "500",
                    }}
                    onClick={() => handleDelete(staff.uid)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle style={{ textAlign: "center" }}>
          Update Staff Details
        </DialogTitle>

        <DialogContent>
          <Typography
            variant="h6"
            style={{ margin: "20px 0", fontWeight: "bold" }}
          >
            Login Credentials
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={currentStaff.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={currentStaff.password}
            onChange={handleInputChange}
          />

          <Divider style={{ margin: "40px 0" }} />

          <Typography
            variant="h6"
            style={{ margin: "20px 0", fontWeight: "bold" }}
          >
            Personal Information
          </Typography>
          <TextField
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            value={currentStaff.username}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            type="text"
            fullWidth
            value={currentStaff.address}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="contact_number"
            label="Contact Number"
            type="text"
            fullWidth
            value={currentStaff.contact_number}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StaffDataTable;
