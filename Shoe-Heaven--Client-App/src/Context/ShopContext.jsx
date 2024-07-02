import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({
    subtotal: 0,
    shippingFee: 0,
    total: 0,
    itemsCart: [],
  });

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

  const fetchCart = async () => {
    const uid = localStorage.getItem("uid");
    try {
      const response = await axios.get(
        `http://localhost:7000/api/cart/cartbyId/${uid}`
      );
      console.log("This is fetched cart", response.data);
      setCartItems(response.data);
    } catch (error) {
      console.error("Failed to fetch cart:", error.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (itemId, sizeId) => {
    try {
      let updatedCartItems = {
        ...cartItems,
      };

      if (!updatedCartItems.itemsCart.length) {
        // If itemsCart array is empty, add the product
        updatedCartItems.itemsCart.push({ itemId, sizeId, qty: 1 });
        updatedCartItems.total = getTotalCartAmount();
        updatedCartItems.subtotal = getTotalCartAmount();
        console.log("This is updateed cart", updatedCartItems);
        const userId = localStorage.getItem("uid");

        const response = await axios.post(
          `http://localhost:7000/api/cart/addToCart/${userId}`,
          updatedCartItems
        );
        if (response.data) {
          console.log("This is updateed cart", updatedCartItems);
          setCartItems(updatedCartItems);
        }
      } else {
        const existingItemIndex = updatedCartItems.itemsCart.findIndex(
          (item) => item.itemId === itemId && item.sizeId === sizeId
        );

        if (existingItemIndex !== -1) {
          // Item exists, increment the quantity
          updatedCartItems.itemsCart[existingItemIndex].qty += 1;
          updatedCartItems.total = getTotalCartAmount();
          updatedCartItems.subtotal = getTotalCartAmount();
        } else {
          // Item does not exist, add as new item
          updatedCartItems.itemsCart.push({ itemId, sizeId, qty: 1 });
          updatedCartItems.total = getTotalCartAmount();
          updatedCartItems.subtotal = getTotalCartAmount();
        }
        const userId = localStorage.getItem("uid");

        const response = await axios.post(
          `http://localhost:7000/api/cart/addToCart/${userId}`,
          updatedCartItems
        );
        if (response.data) {
          console.log("This is updateed cart", updatedCartItems);
          setCartItems(updatedCartItems);
        }
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(
        "Error adding to cart:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const removeFromCart = (itemId, sizeId, removeAll = false) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.itemsCart.findIndex(
        (item) => item.itemId === itemId && item.sizeId === sizeId
      );

      if (existingItemIndex !== -1) {
        const updatedCartItems = { ...prevCartItems };
        if (removeAll || prevCartItems.itemsCart[existingItemIndex].qty === 1) {
          // Remove the item completely
          updatedCartItems.itemsCart.splice(existingItemIndex, 1);
        } else {
          // Decrement the quantity
          updatedCartItems.itemsCart[existingItemIndex].qty -= 1;
        }

        updatedCartItems.subtotal = getTotalCartAmount();
        updatedCartItems.shippingFee = 0;
        updatedCartItems.total = getTotalCartAmount();

        return updatedCartItems;
      }

      return prevCartItems;
    });
  };

  const getTotalCartItems = () => {
    // Initialize cartItems if it's not already defined
    if (!cartItems.itemsCart) {
      cartItems.itemsCart = [];
    }

    let totalItem = 0;
    if (cartItems.itemsCart.length) {
      totalItem = totalItem + cartItems.itemsCart.length;
    }

    return totalItem;
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    cartItems.itemsCart.forEach((cartItem) => {
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
