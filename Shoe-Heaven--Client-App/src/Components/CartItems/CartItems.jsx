import React, { useContext, useState, useEffect } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../../assets/cart_cross_icon.png";
import "remixicon/fonts/remixicon.css";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const {
    getTotalCartAmount,
    products,
    cartItems,
    removeFromCart,
    addToCart,
    clearCart,
  } = useContext(ShopContext);

  const KEY =
    "pk_test_51PaDuRBIVEaofC0ue3h1UY5VBcfxvqlZqAhIkyQM0knpcQxs8MjKCbtcQPg0vSY8fueZx7ympxiogQNn6Lz8lXk200M92PL1Ai";

  const userId = localStorage.getItem("uid");

  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      maximumFractionDigits: 2,
    }).format(value);
  };

  const onToken = (token) => {
    console.log("This is stripe token", token);
    setStripeToken(token);
  };

  useEffect(() => {
    console.log("cartItems:", cartItems);
  }, [cartItems]);

  useEffect(() => {
    const makeRequest = async () => {
      const authToken = localStorage.getItem("access_token");
      try {
        const order = {
          tokenId: stripeToken.id,
          amount: getTotalCartAmount() * 100,
          items: cartItems,
          total: getTotalCartAmount(),
          userId: parseInt(userId),
        };
        const authAxios = axios.create({
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true,
        });
        const res = await authAxios.post(
          "http://localhost:7000/api/checkout/payment",
          order
        );
        console.log("order placed", res.data);
        clearCart();
        navigate("/success");
      } catch (err) {
        console.log(err);
        alert(err);
      }
    };
    if (stripeToken) {
      makeRequest();
    }
  }, [stripeToken]);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
    }
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Size</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cartItems.map((cartItem) => {
        const product = products.find(
          (prod) => prod.prodId === cartItem.itemId
        );
        const size = product?.sizeItems.find(
          (size) => size.sizeId === cartItem.sizeId
        );
        if (product && size) {
          return (
            <div key={`${cartItem.itemId}-${cartItem.sizeId}`}>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={product.imageUrl}
                  alt=""
                  className="carticon-product-icon"
                />
                <p>{product.name}</p>
                <p>{size.sizeName}</p>
                <p>Rs.{product.new_price}</p>
                <div className="cartitems-quantity">
                  <button
                    className="layout qty-btn"
                    onClick={() => removeFromCart(product.prodId, size.sizeId)}
                  >
                    <RiSubtractFill />
                  </button>{" "}
                  <span>{cartItem.qty}</span>{" "}
                  <button
                    className="layout qty-btn"
                    onClick={() => addToCart(product.prodId, size.sizeId)}
                  >
                    <RiAddFill />
                  </button>
                </div>
                <p>Rs.{product.new_price * cartItem.qty}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(product.prodId, size.sizeId, true);
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
          {stripeToken ? (
            <span style={{ color: "red" }}>Processing. Please wait....</span>
          ) : (
            <div>
              {cartItems.length === 0 && (
                <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
              )}

              {cartItems.length > 0 && (
                <StripeCheckout
                  name="Shoe Heaven"
                  shippingAddress
                  description={`Your total is Rs.${getTotalCartAmount()}`}
                  amount={getTotalCartAmount() * 100} // Amount in cents
                  token={onToken}
                  stripeKey={KEY}
                  currency="LKR"
                >
                  <button>PROCEED TO CHECKOUT</button>
                </StripeCheckout>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
