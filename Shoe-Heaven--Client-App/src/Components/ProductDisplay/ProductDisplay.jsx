import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../../assets/star_icon.png";
import star_dull_icon from "../../assets/star_dull_icon.png";

import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [sizeActive, setSizeActive] = useState(null); // Initialize with null or an empty string

  let sizeItems = [];
  try {
    sizeItems = product?.sizeItems ? product.sizeItems.sort((a, b) => a.sizeId - b.sizeId) : [];
  } catch (e) {
    console.error('Error parsing sizeItems:', e);
  }

  const sizeHandleClick = (sizeId) => {
    setSizeActive(sizeId);
    console.log(`this is size ${sizeActive}`);
  };

  

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
          {product?.description}
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className={`productdisplay-right-sizes ${sizeActive ? 'sizeActive' : ''}`}>
            {sizeItems.map((sizeObj, index) => (
              <button
                style={{
                  border: sizeActive === sizeObj.sizeId ? "2px solid black" : "2px solid #ebebeb"
                }}
                onClick={() => sizeHandleClick(sizeObj.sizeId)}
                key={index}
              >
                {sizeObj.sizeName}
              </button>
            ))}
          </div>
        </div>
        <button
          className="add-to-cart"
          onClick={() => {
            addToCart(product?.prodId,sizeActive);
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
