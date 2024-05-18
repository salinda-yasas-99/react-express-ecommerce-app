import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../../assets/star_icon.png";
import star_dull_icon from "../../assets/star_dull_icon.png";

import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  console.log(props.product);
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const[sizeActive,setSizeActive] = useState(false);
  console.log("Sizes:", product?.sizes, "Type:", typeof product?.sizes);
  let sizes = [];
    try {
        // Parse the sizes from the product data and sort them
        // sizes = product?.sizes ? (product.sizes).sort((a, b) => a - b) : [];
        sizes = product?.sizes ? (product.sizes).sort((a, b) => a.size - b.size) : [];

    } catch (e) {
        console.error('Error parsing sizes:', e);
    }

    const sizeHandleClick = (prodId) => {
      setSizeActive(() => ({
        
        [prodId]: true
      }));
    };

  // const parseSizes = (sizes) => {
  //   try {
  //     // First parse the JSON to convert string to actual JSON, if double-encoded
  //     const parsedOnce = JSON.parse(sizes);
  //     // Check if further parsing is needed
  //     const parsedTwice = typeof parsedOnce === 'string' ? JSON.parse(parsedOnce) : parsedOnce;
  //     return Array.isArray(parsedTwice) ? parsedTwice.sort((a, b) => a - b) : [];
  //   } catch (error) {
  //     console.error('Error parsing sizes:', error);
  //     return []; // Return an empty array if there is an error
  //   }
  // };

  // let sizes = parseSizes(product?.sizes);

  // const sizeHandleClick = (size) => {
  //   setSizeActive((prevSizes) => ({
  //     ...prevSizes,
  //     [size]: !prevSizes[size] // Toggle active state for the size
  //   }));
  // };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product?.imageUrl} alt="" />
          <img src={product?.imageUrl} alt="" />
          <img src={product?.imageUrl} alt="" />
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={product?.imageUrl}
            alt=""
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product?.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(132)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-prices-old">
            Rs{product?.old_price}
          </div>
          <div className="productdisplay-right-prices-new">
            Rs{product?.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          {product?.description}.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className={`productdisplay-right-sizes  sizeActive`}>
            
          {sizes.map((sizeObj, index) => (
    <button
      style={{
        border: sizeActive[sizeObj.size] ? "2px solid black" : "2px solid #ebebeb"
      }}
      onClick={() => sizeHandleClick(sizeObj.size)}
      key={index}
    >
      {sizeObj.size}
    </button>
  ))}
          </div>
        </div>
        <button className="add-to-cart"
          onClick={() => {
            addToCart(product?.prodId);
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
