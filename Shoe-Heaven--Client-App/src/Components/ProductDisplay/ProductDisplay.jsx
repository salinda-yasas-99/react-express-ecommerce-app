import React, { useContext, useState, useEffect } from "react";
import "./ProductDisplay.css";
import star_icon from "../../assets/star_icon.png";
import star_dull_icon from "../../assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import Feedback from "../Feedback/Feedback";

const ProductDisplay = ({ product, feedbacks }) => {
  const { addToCart } = useContext(ShopContext);
  const [sizeActive, setSizeActive] = useState(null);
  const [inStock, setInStock] = useState(0);

  let sizeItems = [];

  try {
    sizeItems = product?.sizeItems
      ? product.sizeItems.sort((a, b) => a.sizeId - b.sizeId)
      : [];
  } catch (e) {
    console.error("Error parsing sizeItems:", e);
  }

  const sizeHandleClick = (sizeId,quantity) => {
    setSizeActive(sizeId);
    setInStock(quantity);
    console.log(`this is size ${sizeId}`);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((star, index) => {
      index += 1;
      return (
        <span key={index} className={index <= rating ? "star on" : "star off"}>
          &#9733;
        </span>
      );
    });
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    if (sizeActive === null) {
      alert("Please select a size before adding to the cart.");
      return;
    }

    addToCart(product?.prodId, sizeActive);
  };

  return (
    <div className="productdiplay-main">
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
            <div
              className={`productdisplay-right-sizes ${
                sizeActive ? "sizeActive" : ""
              }`}
            >
              {/* {sizeItems.map((sizeObj, index) => (
                <div key={index}>
                  <button
                    style={{
                      border:
                        sizeActive === sizeObj.sizeId
                          ? "2px solid black"
                          : "2px solid #ebebeb",
                    }}
                    onClick={() => sizeHandleClick(sizeObj.sizeId)}
                  >
                    {sizeObj.sizeName}
                  </button>
                  <p> {sizeObj.quantity}</p>
                </div>
              ))} */}
            {sizeItems
          .sort((a, b) => {
            const sizeA = parseInt(a.sizeName.replace("size ", ""), 10);
            const sizeB = parseInt(b.sizeName.replace("size ", ""), 10);
            return sizeA - sizeB;
          })
          .map((sizeObj, index) => (
            <div key={index}>
              <button
                style={{
                  border:
                    sizeActive === sizeObj.sizeId
                      ? "2px solid black"
                      : "2px solid #ebebeb",
                }}
                onClick={() => sizeHandleClick(sizeObj.sizeId, sizeObj.quantity)}
              >
                {sizeObj.sizeName}
              </button>
              <p>{sizeActive === sizeObj.sizeId && sizeObj.quantity}</p> 
            </div>
          ))}
      </div>
      {sizeActive !== null && (
        <div className="in-stock">
          In stock: <strong>{inStock}</strong>
        </div>
      )}
          </div>
          <button className="add-to-cart" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>
      <div className="feedback">
        <Feedback productId={product?.prodId} />
      </div>
      <div>
        <div className="user-feedbacks">
          <h2>Reviews</h2>
          <ul className="feedback-list">
            {feedbacks && feedbacks.length > 0 ? (
              feedbacks.map((feedback, index) => (
                <li key={index} className="feedback-item">
                  <div className="feedback-rating">
                    {renderStars(feedback.stars)}
                  </div>
                  <div className="feedback-user">
                    <strong>{feedback.username}</strong>
                  </div>

                  <div className="feedback-comment">{feedback.comment}</div>
                </li>
              ))
            ) : (
              <div>No feedbacks available.</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
