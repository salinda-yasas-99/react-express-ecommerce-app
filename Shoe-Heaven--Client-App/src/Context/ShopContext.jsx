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
        //initializeCart(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // const initializeCart = (products) => {
  //   let newCart = {};
  //   products.forEach((product) => {
  //     newCart[product.prodId] = 0;
  //   });
  //   setCartItems(newCart);
  //   console.log(`this is cart ${newCart}`);
  // };

  const addToCart = (itemId, sizeId) => {
    setCartItems((prevCartItems) => {
      if (!prevCartItems.length) {
        // If cartItems array is empty, add the product at once
        return [{ itemId, sizeId, qty: 1 }];
      }

      const existingItemIndex = prevCartItems.findIndex(
        (item) => item.itemId === itemId && item.sizeId === sizeId
      );

      if (existingItemIndex !== -1) {
        // Item exists, increment the quantity
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex].qty += 1;
        console.log(`This is cart `, cartItems);
        return updatedCartItems;
      } else {
        console.log(`This is cart `, cartItems);
        // Item does not exist, add as new item
        return [...prevCartItems, { itemId, sizeId, qty: 1 }];
      }
    });
  };

  const removeFromCart = (itemId, removeAll = false) => {
    if (removeAll) {
      // Remove the item completely
      setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
    } else {
      // Decrement the count or remove if only one left
      setCartItems((prev) => ({
        ...prev,
        [itemId]: Math.max(prev[itemId] - 1, 0),
      }));
    }
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (let item in cartItems) {
      // if (cartItems[item] > 0) {
      //   totalItem += cartItems[item];
      // }
      if (cartItems.length) {
        totalItem = totalItem++;
      }
    }

    return totalItem;
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      // if (cartItems[item] > 0) {
      //   const itemInfo = products.find((product) => product.id === item);
      //   if (itemInfo && itemInfo.new_price) {
      //     totalAmount += itemInfo.new_price * cartItems[item];
      //     // console.log(`Adding ${itemInfo.new_price} * ${cartItems[item]}`);
      //   }
      const itemInfo = products.find((product) => product.id === item.prodId);
      if (itemInfo && itemInfo.new_price) {
        totalAmount += itemInfo.new_price * item.qty;
        console.log(`Total amount ${totalAmount}`);
      }
    }

    // console.log(`Total Amount: ${totalAmount}`);
    return totalAmount;
  };

  const contextValue = {
    getTotalCartAmount,
    getTotalCartItems,
    products,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
