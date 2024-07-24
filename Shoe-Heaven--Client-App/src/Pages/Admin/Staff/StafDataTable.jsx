import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getAllAdmins } from "../../../Services/RestApiCalls";
import axios from "axios";

const StaffDataTable = () => {
  // const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [staffData, setStaffData] = useState([]);

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
      try {
        const response = await axios.delete(
          `http://localhost:7000/api/users/delete/${userIdToDelete}`
        );
        console.log(response.data);
        fetchUsers();
        // setOpen(false);
        // window.location.reload();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  return (
    <div className="staff-management">
      <h2 style={{ padding: "20px 0 30px", color: "green" }}>
        Staff Management
      </h2>
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
            {staffData.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell component="th" scope="row">
                  {staff.username}
                </TableCell>
                <TableCell align="center">{staff.role}</TableCell>
                <TableCell align="center">{staff.address}</TableCell>
                <TableCell align="center">{staff.email}</TableCell>
                <TableCell align="center">
                  {staff.role !== "Admin" ? (
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
                  ) : (
                    <span style={{ color: "grey" }}>Not Allowed</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StaffDataTable;
