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

  // const initializeCart = (products) => {
  //   let newCart = {};
  //   products.forEach((product) => {
  //     newCart[product.prodId] = 0;
  //   });
  //   setCartItems(newCart);
  //   console.log(`this is cart ${newCart}`);
  // };

  // const addToCart = (itemId, sizeId) => {
  //   setCartItems((prevCartItems) => {
  //     if (!prevCartItems.length) {
  //       // If cartItems array is empty, add the product a
  //       return [{ itemId, sizeId, qty: 1 }];
  //     }

  //     const existingItemIndex = prevCartItems.findIndex(
  //       (item) => item.itemId === itemId && item.sizeId === sizeId
  //     );

  //     if (existingItemIndex !== -1) {
  //       // Item exists, increment the quantity
  //       const updatedCartItems = [...prevCartItems];
  //       updatedCartItems[existingItemIndex].qty += 1;
  //       console.log(`This is cart `, cartItems);
  //       return updatedCartItems;
  //     } else {
  //       console.log(`This is cart `, cartItems);
  //       // Item does not exist, add as new item
  //       return [...prevCartItems, { itemId, sizeId, qty: 1 }];
  //     }
  //   });
  // };

  // const addToCart = (itemId, sizeId) => {
  //   setCartItems((prevCartItems) => {
  //     if (!prevCartItems.itemsCart.length) {
  //       // If cartItems array is empty, add the product
  //       const updatedCartItems = {
  //         subtotal: getTotalCartAmount(),
  //         shippingFee: 0,
  //         total: getTotalCartAmount(),
  //         itemsCart: [{ itemId, sizeId, qty: 1 }],
  //       };
  //       console.log("Updated cart items:", updatedCartItems);
  //       return updatedCartItems;
  //     }

  //     const existingItemIndex = prevCartItems.itemsCart.findIndex(
  //       (item) => item.itemId === itemId && item.sizeId === sizeId
  //     );

  //     if (existingItemIndex !== -1) {
  //       // Item exists, increment the quantity
  //       const updatedCartItems = { ...prevCartItems };
  //       updatedCartItems.itemsCart[existingItemIndex].qty += 1;
  //       updatedCartItems.subtotal = getTotalCartAmount();
  //       updatedCartItems.shippingFee = 0;
  //       updatedCartItems.total = getTotalCartAmount();
  //       console.log("Updated cart items:", updatedCartItems);
  //       return updatedCartItems;
  //     } else {
  //       // Item does not exist, add as new item
  //       const updatedCartItems = { ...prevCartItems };
  //       updatedCartItems.itemsCart = [
  //         ...prevCartItems.itemsCart,
  //         { itemId, sizeId, qty: 1 },
  //       ];
  //       updatedCartItems.subtotal = getTotalCartAmount();
  //       updatedCartItems.shippingFee = 0;
  //       updatedCartItems.total = getTotalCartAmount();

  //       console.log("Updated cart items:", updatedCartItems);
  //       return updatedCartItems;
  //     }
  //   });
  // };

  // const [cartSubtotal, setCartSubtotal] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  // useEffect(() => {
  //   // Calculate subtotal and total based on cartItems and products
  //   const newSubtotal = getTotalCartAmount(); // Assuming this function calculates subtotal
  //   const newTotal = newSubtotal + cartItems.shippingFee; // Adjust based on your logic

  //   // Update the separate states for subtotal and total
  //   setCartSubtotal(newSubtotal);
  //   setCartTotal(newTotal);
  // }, [cartItems]);

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

  // const addToCart = async (itemId, sizeId) => {
  //   try {
  //     setCartItems(async (prevCartItems) => {
  //       // Start with the current cart items
  //       let updatedCartItems = {
  //         ...prevCartItems,
  //       };

  //       // Calculate the new total and subtotal based on the current state
  //       let newTotal = prevCartItems.total || 0; // Default to the current total
  //       let newSubtotal = prevCartItems.subtotal || 0; // Default to the current subtotal

  //       if (!updatedCartItems.itemsCart.length) {
  //         // If itemsCart array is empty, add the product
  //         updatedCartItems.itemsCart = [{ itemId, sizeId, qty: 1 }];
  //         newTotal += getTotalCartAmount(); // Add the cost of the new item to the total
  //         newSubtotal += getTotalCartAmount(); // Add the cost of the new item to the subtotal
  //       } else {
  //         const existingItemIndex = updatedCartItems.itemsCart.findIndex(
  //           (item) => item.itemId === itemId && item.sizeId === sizeId
  //         );

  //         if (existingItemIndex !== -1) {
  //           // Item exists, increment the quantity
  //           updatedCartItems.itemsCart[existingItemIndex].qty += 1;
  //           newTotal += getTotalCartAmount(); // Add the cost of the incremented item to the total
  //           newSubtotal += getTotalCartAmount(); // Add the cost of the incremented item to the subtotal
  //         } else {
  //           // Item does not exist, add as new item
  //           updatedCartItems.itemsCart.push({ itemId, sizeId, qty: 1 });
  //           newTotal += getTotalCartAmount(); // Add the cost of the new item to the total
  //           newSubtotal += getTotalCartAmount(); // Add the cost of the new item to the subtotal
  //         }
  //       }

  //       // Update the total and subtotal in the updatedCartItems object
  //       updatedCartItems.total = newTotal;
  //       updatedCartItems.subtotal = newSubtotal;

  //       // const userId = localStorage.getItem("uid");

  //       // const response = await axios.post(
  //       //   `http://localhost:7000/api/cart/addToCart/${userId}`,
  //       //   updatedCartItems
  //       // );
  //       // if (response.data) {
  //       //   console.log(response.data);
  //       //   return updatedCartItems;
  //       // }
  //       console.log("This is the updated cart", updatedCartItems);
  //       return updatedCartItems;
  //     });
  //   } catch (error) {
  //     // Handle any errors that occurred during the request
  //     console.error(
  //       "Error adding to cart:",
  //       error.response ? error.response.data : error.message
  //     );
  //   }
  // };

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
