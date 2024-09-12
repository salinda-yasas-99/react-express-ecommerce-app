import React, { useState, useEffect } from "react";
import "./MyOrders.css";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const uid = localStorage.getItem("uid");
      const authToken = localStorage.getItem("access_token");
      try {
        const authAxios = axios.create({
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true,
        });

        const response = await authAxios.get(
          `http://localhost:7000/api/orders/userOrders/${uid}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <p>View your pending, delivered orders here.</p>
      <div className="orders-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <div className="order-header">
                <div className="order-id">
                  <span>Order</span> <div>{order.orderId} <span>-Non Refundable</span></div>
                  
                </div>
                <div className="order-date">Order Placed: {formatDate(order.date)}</div>

                <div className="order-date">Order time: {order.time}</div>
              </div>
              <div className="order-items">
                {Array.isArray(order.orderItems) &&
                  order.orderItems.map((item, index) => (
                    <div key={index} className="order-item-details">
                      <img
                        src={item.productImage}
                        alt={item.name}
                        className="item-image"
                      />
                      <div className="item-info">
                        <p className="item-name">{item.productName}</p>

                        <p className="item-size">Size: {item.sizeName}</p>
                        <p className="item-qty">Qty: {item.qty}</p>
                      </div>
                      <div className="item-status">
                        <p className="status-label">Status:</p>
                        <p className="status">{order.status}</p>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="order-footer">
                <p>Total Amount:</p>
                <p className="order-total">Rs. {order.Total}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
