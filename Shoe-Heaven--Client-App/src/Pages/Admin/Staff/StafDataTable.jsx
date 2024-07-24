import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const StaffDataTable = () => {
  const [staffData, setStaffData] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Admin",
      address: "123 Main St",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Order Manager",
      address: "456 Elm St",
      email: "jane.smith@example.com",
    },
  ]);

  const handleDelete = (id) => {
    setStaffData(staffData.filter((staff) => staff.id !== id));
  };

  return (
    <div className="staff-management">
      <h2 style={{padding:"20px 0 30px",color:"green"}}>Staff Management</h2>
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
                  {staff.name}
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
                      onClick={() => handleDelete(staff.id)}
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
