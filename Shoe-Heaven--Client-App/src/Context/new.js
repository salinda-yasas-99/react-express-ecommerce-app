const addToCart = async (itemId, sizeId) => {
  try {
    setCartItems(async (prevCartItems) => {
      let updatedCartItems = {
        ...prevCartItems,
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
          return updatedCartItems;
        }
        // return updatedCartItems;
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
      }
      const userId = localStorage.getItem("uid");

      const response = await axios.post(
        `http://localhost:7000/api/cart/addToCart/${userId}`,
        updatedCartItems
      );
      if (response.data) {
        console.log("This is updateed cart", updatedCartItems);
        return updatedCartItems;
      }
      // console.log("This is updateed cart", updatedCartItems);
      // return updatedCartItems;
    });
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error(
      "Error adding to cart:",
      error.response ? error.response.data : error.message
    );
  }
};
