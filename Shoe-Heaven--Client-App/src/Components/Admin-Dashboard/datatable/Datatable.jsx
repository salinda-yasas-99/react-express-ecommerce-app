import React, { useEffect, useState } from "react";
import "./Datatable.css";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllUsers } from "../../../Services/RestApiCalls";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const Datatable = (props) => {
  const [usersArray, setUsersArray] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setUsersArray(users);
      setFilteredUsers(users); // Initialize with all users
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredUsers(
      usersArray.filter((user) =>
        user.username.toLowerCase().includes(value)
      )
    );
  };

  const handleClickOpen = (userId) => {
    const role = localStorage.getItem("role");
    if (role === "order-manager") {
      setAlertOpen(true); // Show the alert
      return;
    }
    setOpen(true);
    setUserIdToDelete(userId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
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
        setOpen(false);
        window.location.reload();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">Customers</div>
      
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        style={{
            color: "#007bff",
            fontSize: "12px",
            border: "1px solid #007bff",
            padding: "5px",
            borderRadius: "50px",
            margin:"5px 0px 20px"
            
          
        }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Contact No</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.uid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.uid}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.address}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.contact}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => handleClickOpen(user.uid)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #ff0000",
                      color: "#ff0000",
                      background: "white",
                      borderRadius: "5px",
                      padding: "10px 15px",
                      fontWeight: "500",
                    }}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleAlertClose} severity="warning">
          You are not authorized to perform this action.
        </Alert>
      </Snackbar>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Datatable;




