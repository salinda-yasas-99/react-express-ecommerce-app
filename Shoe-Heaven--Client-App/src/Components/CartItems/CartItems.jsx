import React, { useContext, useState, useEffect } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../../assets/cart_cross_icon.png";
import "remixicon/fonts/remixicon.css";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import axios from "axios";

const CartItems = () => {
  const { getTotalCartAmount, products, cartItems, removeFromCart, addToCart } =
    useContext(ShopContext);

  //const [cart, setCart] = useState();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      maximumFractionDigits: 2,
    }).format(value);
  };

  useEffect(() => {
    console.log("cartItems in cart page:", cartItems);
  }, [cartItems]);

  // const fetchCart = async () => {
  //   const Token = localStorage.getItem("token");
  //   const userId = 1;
  //   // const authAxios = axios.create({
  //   //   headers: {
  //   //     Authorization: `Bearer ${Token}`,
  //   //   },
  //   //   withCredentials: true,
  //   // });
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:7000/api/cart/cartbyId/${userId}`
  //     );
  //     console.log("this is cart in cart page ", response.data);
  //     setCart(response.data);
  //     return response.data;
  //   } catch (err) {
  //     console.log("This is error", err);
  //   }
  // };

  // useEffect(() => {
  //   fetchCart();
  // }, []);

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

      {cartItems.itemsCart.map((cartItem) => {
        const product = products.find(
          (prod) => prod.prodId === cartItem.fk_productId
        );
        const size = product?.sizeItems.find(
          (size) => size.sizeId === cartItem.fk_sizeId
        );
        if (product && size) {
          return (
            <div key={`${cartItem.fk_productId}-${cartItem.fk_sizeId}`}>
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
                  <span>{cartItem.itemQuantity}</span>{" "}
                  <button
                    className="layout qty-btn"
                    onClick={() => addToCart(product.prodId, size.sizeId)}
                  >
                    <RiAddFill />
                  </button>
                </div>
                <p>Rs.{product.new_price * cartItem.itemQuantity}</p>
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
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>Rs.{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
