//   return (
//     <div className='shop-category'>
//       <img  className='shopcategory-banner' src={props.banner} alt="" />
//       <div className="shopcategory-indexSort">
//         <p>
//           <span>Showing 1-12</span> out of 36 products

//         </p>
//           <div className="shopcategory-sort">
//              Sort by <img src={dropdown_icon} alt="" />
//           </div>
//       </div>
//       <div className="shopcategory-products">
//         {products.map((item,i)=>{
//               if(props.category === item.category){
//                   return <Item key={i} id ={item.id} name ={item.name} image ={item.image} new_price ={item.new_price} old_price ={item.old_price} />
//               } else{
//                 return null;
//               }
//         })}
//       </div>
//       <div className="shopcategory-loadmore">
//         Explore more
//       </div>
//     </div>
//   )
// }

import React, { useContext, useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import axios from "axios";

const ShopCategory = (props) => {
  const [products, setProducts] = useState([]);
  const [displayCount, setDisplayCount] = useState(6); // Start by showing 6 products

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/products/getAllProducts")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleLoadMore = () => {
    const categoryProducts = products.filter(
      (item) => item.category === props.category
    );
    if (displayCount >= categoryProducts.length) {
      setDisplayCount(6); // Reset to show only the initial 6 products
    } else {
      setDisplayCount((prevCount) => prevCount + 6); // Add more products to the display count
    }
  };

  const categoryProducts = products.filter(
    (item) => item.category === props.category
  );

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>
            Showing 1-{Math.min(displayCount, categoryProducts.length)}
          </span>{" "}
          out of {categoryProducts.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {categoryProducts.slice(0, displayCount).map((item, i) => (
          <Item key={item.prodId} {...item} />
        ))}
      </div>
      {categoryProducts.length > 6 && ( // Conditional rendering based on the number of category products
        <div className="shopcategory-loadmore" onClick={handleLoadMore}>
          {displayCount >= categoryProducts.length
            ? "Show Less"
            : "Explore More"}
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
