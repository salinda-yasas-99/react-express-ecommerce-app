import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import './InquiryManagement.css';

const InquiryManagement = () => {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [open, setOpen] = useState(false);

//   useEffect(() => {
//     // Fetch inquiries from the API
//     const fetchInquiries = async () => {
//       try {
//         const response = await axios.get('http://localhost:7000/api/inquiries/get');
//         setInquiries(response.data);
//       } catch (error) {
//         console.error('Error fetching inquiries:', error);
//       }
//     };
//     fetchInquiries();
//   }, []);

  const handleView = (inquiry) => {
    setSelectedInquiry(inquiry);
    setOpen(true);
  };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:7000/api/inquiries/${id}`);
//       setInquiries(inquiries.filter(inquiry => inquiry.id !== id));
//     } catch (error) {
//       console.error('Error deleting inquiry:', error);
//       alert('Failed to delete inquiry. Please try again later.');
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedInquiry(null);
//   };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'subject', headerName: 'Subject', width: 200 },
    { field: 'message', headerName: 'Message', width: 300 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleView(params.row)}
          >
            View
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="inquiry-management">
      <Typography variant="h4" gutterBottom>Inquiry Management</Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={inquiries}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
      {selectedInquiry && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Inquiry Details</DialogTitle>
          <DialogContent>
            <Typography><strong>Name:</strong> lakmal</Typography>
            <Typography><strong>Subject:</strong> product confort</Typography>
            <Typography><strong>Message:</strong> can we replace the shoes</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default InquiryManagement;
