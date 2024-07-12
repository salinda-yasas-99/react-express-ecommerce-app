import React from "react";
import "./OrderSuccess.css"; 

const OrderSuccess = () => {
  return (
    // <div className="order-success">
    //   <div className="order-success-message">
    //     Your order placed successfully. Thank you for choosing Shoe Heaven
    //   </div>
    // </div>
    <div className="order-success-container">
      <div className="success-icon">&#10003;</div>
      <h1>Order Placed Successfully!</h1>
      <p>Thank you for your purchase. </p>
      <button className="home-button" onClick={() => window.location.href = '/'}>Continue Shopping</button>
    </div>
  );
};

export default OrderSuccess;
