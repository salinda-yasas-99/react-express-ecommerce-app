import React, { useContext, useState, useEffect } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../../assets/cart_cross_icon.png";
import "remixicon/fonts/remixicon.css";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";

const CartItems = () => {
  const { getTotalCartAmount, products, cartItems, removeFromCart,addToCart} =
    useContext(ShopContext);
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>Rs.{e.new_price}</p>
                <div className="cartitems-quantity">
                  <button className="layout qty-btn" onClick={()=>removeFromCart(e.id)}>
                    <RiSubtractFill />
                  </button>{" "}
                  <span>{cartItems[e.id]}</span>{" "}
                  <button className="layout qty-btn" onClick={()=>addToCart(e.id)}>
                    <RiAddFill />
                  </button>
                </div>
                <p>Rs.{e.new_price * cartItems[e.id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id,true);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Sub Total</p>
              <p>Rs.{formatCurrency(getTotalCartAmount())}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>Rs.{formatCurrency(getTotalCartAmount())}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
