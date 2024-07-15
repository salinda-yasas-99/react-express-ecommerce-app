import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';

const OrdersDataTable = () => {
  const [orders, setOrders] = useState([
    {
      id: 'OD1234',
      customer: 'Kasun',
      products: [
        { name: 'Asics Men Running Shoes', quantity: 2, size: 10, amount: 6000 },
        { name: 'Nike Women Running Shoes', quantity: 1, size: 8, amount: 6000 }
      ],
      placedDate: '12/07/2024',
      placedTime: '14:35',
      status: 'Pending'
    },

    {
      id: 'OD1356',
      customer: 'Ranil',
      products: [
        { name: 'Asics Men Running Shoes', quantity: 1, size: 10, amount: 16000 },
        { name: 'Nike Women Running Shoes', quantity: 1, size: 8, amount: 9900 }
      ],
      placedDate: '12/07/2024',
      placedTime: '14:35',
      status: 'Pending'
    },
    
  ]);

  const changeStatus = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId && order.status === 'Pending'
          ? { ...order, status: 'Approved' }
          : order
      )
    );
    console.log(`Order ${orderId} status changed to Approved`);
  };

  const calculateTotalAmount = (products) => {
    return products.reduce((total, product) => total + product.amount, 0);
  };

  return (
    <div className='orders-table'>
      <h2>Orders</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell align="right">Customer</TableCell>
              <TableCell align="right">Placed Date</TableCell>
              <TableCell align="right">Placed Time</TableCell>
              <TableCell align="right">Total Amount</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
              <TableCell align="right">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                changeStatus={changeStatus}
                calculateTotalAmount={calculateTotalAmount}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const OrderRow = ({ order, changeStatus, calculateTotalAmount }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {order.id}
        </TableCell>
        <TableCell align="right">{order.customer}</TableCell>
        <TableCell align="right">{order.placedDate}</TableCell>
        <TableCell align="right">{order.placedTime}</TableCell>
        <TableCell align="right">{calculateTotalAmount(order.products)}</TableCell>
        <TableCell align="right">{order.status}</TableCell>
        <TableCell align="right">
          {order.status === 'Pending' && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => changeStatus(order.id)}
            >
              Approve
            </Button>
          )}
        </TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpen(!open)}
          >
            {open ? 'Hide Details' : 'View Details'}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="products">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Size</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.products.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {product.name}
                      </TableCell>
                      <TableCell align="right">{product.quantity}</TableCell>
                      <TableCell align="right">{product.size}</TableCell>
                      <TableCell align="right">{product.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrdersDataTable;
