import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/products/getAllProducts")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCart = (itemId, sizeId) => {
    setCartItems((prevCartItems) => {
      if (!prevCartItems.length) {
        return [{ itemId, sizeId, qty: 1 }];
      }

      const existingItemIndex = prevCartItems.findIndex(
        (item) => item.itemId === itemId && item.sizeId === sizeId
      );

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex].qty += 1;
        return updatedCartItems;
      } else {
        return [...prevCartItems, { itemId, sizeId, qty: 1 }];
      }
    });
  };

  const removeFromCart = (itemId, sizeId, removeAll = false) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(
        (item) => item.itemId === itemId && item.sizeId === sizeId
      );

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...prevCartItems];

        if (removeAll || updatedCartItems[existingItemIndex].qty === 1) {
          updatedCartItems.splice(existingItemIndex, 1);
        } else {
          updatedCartItems[existingItemIndex].qty -= 1;
        }
        return updatedCartItems;
      }

      return prevCartItems;
    });
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    if (cartItems.length) {
      totalItem = totalItem + cartItems.length;
    }

    return totalItem;
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    cartItems.forEach((cartItem) => {
      const product = products.find(
        (product) => product.prodId === cartItem.itemId
      );
      if (product && product.new_price) {
        totalAmount += product.new_price * cartItem.qty;
      }
    });
    console.log(`Total amount: ${totalAmount}`);
    return totalAmount;
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const contextValue = {
    getTotalCartAmount,
    getTotalCartItems,
    products,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
