import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import axios from "axios";

const OrdersDataTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const authToken = localStorage.getItem("access_token");
    try {
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });
      const response = await authAxios.get(
        `http://localhost:7000/api/orders/getAllOrders`
      );
      console.log(response);
      setOrders(response.data);
    } catch (err) {
      console.log("This is error", err);
    }
  };

  const changeStatus = async (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId && order.status === "Pending"
          ? { ...order, status: "Approved" }
          : order
      )
    );
    console.log(`Order ${orderId} status changed to Approved`);
    const authToken = localStorage.getItem("access_token");
    try {
      const data = {
        status: "Delivered",
      };
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });
      const response = await authAxios.put(
        `http://localhost:7000/api/orders/statusUpdate/${orderId}`,
        data
      );
      console.log("This is status update response", response.data);
      fetchOrders();
    } catch (err) {
      console.log("This is error", err);
    }
  };

  const calculateTotalAmount = (products) => {
    return products.reduce((total, product) => total + product.amount, 0);
  };

  return (
    <div className="orders-table">
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
            {orders
              .sort((a, b) => {
               
                const dateA = new Date(`${a.date} ${a.time}`);
                const dateB = new Date(`${b.date} ${b.time}`);
                return dateB - dateA; 
              })
              .map((order) => (
                <OrderRow
                  key={order.orderId}
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
          {order.orderId}
        </TableCell>
        <TableCell align="right">{order.username}</TableCell>
        <TableCell align="right">{order.date}</TableCell>
        <TableCell align="right">{order.time}</TableCell>
        <TableCell align="right">
          {/* {calculateTotalAmount(order.orderItems)} */}
          {order.Total}
        </TableCell>
        <TableCell align="right">{order.status}</TableCell>
        <TableCell align="right">
          {order.status === "Pending" ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => changeStatus(order.orderId)}
            >
              Approve
            </Button>
          ) : (
            "Completed"
          )}
        </TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpen(!open)}
          >
            {open ? "Hide Details" : "View Details"}
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
                  {order.orderItems.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {product.productName}
                      </TableCell>
                      <TableCell align="right">{product.qty}</TableCell>
                      <TableCell align="right">{product.sizeName}</TableCell>
                      <TableCell align="right">{product.qty}</TableCell>
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
