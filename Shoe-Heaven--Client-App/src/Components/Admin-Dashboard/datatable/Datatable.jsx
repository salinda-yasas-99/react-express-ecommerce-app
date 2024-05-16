import "./Datatable.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import axios from "axios";

const Datatable = (props) => {
  const [usersArray, setUsersArray] = useState([]);
  const [open, setOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setUsersArray(users);
      //console.log("This is users",usersArray);

      console.log(usersArray);
    };

    fetchUsers();
  }, []);

  const handleClickOpen = (userId) => {
    setOpen(true);
    setUserIdToDelete(userId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (userIdToDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:7000/api/users/${userIdToDelete}`
        );
        console.log(response.data);
        setOpen(false);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/dashboard/users/new" className="link">
          Add New
        </Link>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Contact No</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersArray.map((user) => (
              <TableRow
                key={user.uid} // Assuming each user has a unique 'name' property
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
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
                  {user.contact_number}
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid blue",
                      color: "blue",
                      background: "white",
                      borderRadius: "5px",
                      padding: "10px 15px",
                      fontWeight: "500",
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleClickOpen(user.id)}
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
