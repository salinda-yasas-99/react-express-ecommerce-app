import React, { useState, useEffect } from "react";
// import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import "./InquiryManagement.css";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  DialogContentText,
} from "@mui/material";

const InquiryManagement = () => {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInq, setSelectedInq] = useState();
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleView = (inquiry) => {
    setSelectedInquiry(inquiry);
    setOpen(true);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    const authToken = localStorage.getItem("access_token");

    try {
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });

      const response = await authAxios.get(
        "http://localhost:7000/api/inqueries/get"
      );

      console.log("Fetched inquireies:", response.data);

      setInquiries(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleDelete = async (id) => {
    // Retrieve the authentication token from local storage
    const authToken = localStorage.getItem("access_token"); // Adjust 'authToken' based on your application's naming convention

    try {
      // Include the Authorization header with the retrieved token
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });
      await authAxios.delete(
        `http://localhost:7000/api/inqueries/delete/${id}`
      );

      setOpen(false);
      fetchInquiries();
    } catch (error) {
      console.error("Failed to delete the inquiry", error);
      alert(error.message);
    }
  };

  // const columns = [
  //   { field: "name", headerName: "Name", width: 150 },
  //   { field: "subject", headerName: "Subject", width: 200 },
  //   { field: "message", headerName: "Message", width: 300 },
  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     width: 150,
  //     renderCell: (params) => (
  //       <>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           onClick={() => handleView(params.row)}
  //         >
  //           View
  //         </Button>
  //         <Button
  //           variant="contained"
  //           color="secondary"
  //           onClick={() => handleDelete(params.row.id)}
  //         >
  //           Delete
  //         </Button>
  //       </>
  //     ),
  //   },
  // ];

  return (
    <div className="inquiry-management">
      <div className="datatableTitle">Inquiries</div>

      {successMessage && (
        <p
          className="successMessage"
          style={{
            color: "green",
            fontSize: "16px",
            paddingLeft: "10px",
            paddingBottom: "8px",
          }}
        >
          {successMessage}
        </p>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Subject</TableCell>
              <TableCell align="right">Message</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inquiries.map((inq) => (
              <TableRow key={inq.InqId}>
                <TableCell align="center">{inq.name}</TableCell>
                <TableCell align="right">{inq.subject}</TableCell>
                <TableCell align="right">{inq.message}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      const role = localStorage.getItem("role");
                      if (role == "order-manager") {
                        alert("You are not authorized to perform this action");
                        return;
                      }
                      setOpen(true);
                      setSelectedInq(inq);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this inquiry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => handleDelete(selectedInq.InqId)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InquiryManagement;
