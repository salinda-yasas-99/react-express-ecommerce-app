// import React, { createContext, useState,useEffect } from "react";
// import all_product from "../assets/all_product";
// import axios from "axios";


// export const  ShopContext = createContext(null);


    



// const  getDefaultCart = ()=>{
//     let cart= {};
//     for (let index = 0; index < all_product.length+1; index++) {
//         cart[index]=0;
        
//     }
//     return cart;
// }

// const initializeCart = (products) => {
//     let newCart = {};
//     products.forEach(product => {
//         newCart[product.id] = 0;
//     });
//     setCartItems(newCart);
// };

// const ShopContextProvider = (props) =>{
//     const [products, setProducts] = useState([]);
//     const [cartItems, setCartItems] = useState({});
//     useEffect(() => {
//         axios.get('http://localhost:5000/api/product')
//             .then(response => {
//                 setProducts(response.data);
//                 initializeCart(response.data);
//             })
//             .catch(error => console.error('Error fetching products:', error));
//     }, []);
    

//     const addToCart = (itemId)=>{
//         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
//         console.log(cartItems);
//     }

//     const removeFromCart = (itemId)=>{
//         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
//     }

//     const contextValue = {products,cartItems,addToCart,removeFromCart}
//     console.log(cartItems);

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     )
// }

// export default ShopContextProvider

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});

    useEffect(() => {
        axios.get('http://localhost:7000/api/products/getAllProducts')
            .then(response => {
                console.log(response.data);
                setProducts(response.data);
                initializeCart(response.data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const initializeCart = (products) => {
        let newCart = {};
        products.forEach(product => {
            newCart[product.id] = 0;
        });
        setCartItems(newCart);
    };

    const addToCart = (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    };

    const removeFromCart = (itemId,removeAll = false) => {
        if (removeAll) {
            // Remove the item completely
            setCartItems(prev => ({ ...prev, [itemId]: 0 }));
        } else {
            // Decrement the count or remove if only one left
            setCartItems(prev => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
        }
    };

    const getTotalCartItems = () =>{
        let totalItem=0;
        for(const item in  cartItems){
            if(cartItems[item]>0){
                totalItem+=cartItems[item];
            }
        }

        return totalItem;
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = products.find(product => product.id === item);
                if (itemInfo && itemInfo.new_price) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                    // console.log(`Adding ${itemInfo.new_price} * ${cartItems[item]}`);
                }
            }
        }
        // console.log(`Total Amount: ${totalAmount}`);
        return totalAmount;
    };
    
    
    
    

    const contextValue = {getTotalCartAmount,getTotalCartItems, products, cartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
