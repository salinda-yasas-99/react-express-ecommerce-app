import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const OrdersDataTable = () => {
    
      
  return (
    <div className='orders-table'>
      <h2>Orders</h2>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order Id</TableCell>
            <TableCell align="right">Customer</TableCell>
            <TableCell align="right">Product</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right"> PlacedDate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow
             
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                OD1234
              </TableCell>
             
              <TableCell align="right">Kasun</TableCell>
              <TableCell align="right">Asics Men Running Shoes</TableCell>
              <TableCell align="right">2</TableCell>
              <TableCell align="right">10</TableCell>
              <TableCell align="right">12000</TableCell>
              <TableCell align="right">12/07/2024</TableCell>
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default OrdersDataTable
