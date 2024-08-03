import React, { useContext, useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import axios from "axios";
import { useLocation } from 'react-router-dom';

const ShopCategory = (props) => {
  const [products, setProducts] = useState([]);
  const [displayCount, setDisplayCount] = useState(6); // Start by showing 6 products
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    const authToken = localStorage.getItem("access_token");
    const authAxios = axios.create({
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      withCredentials: true,
    });

    authAxios
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

  let location = useLocation();
  useEffect(() => {
    setSortOrder("");
    console.log("work");
   
    
  }, [location]);

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const getSortedProducts = () => {
    
    let sortedProducts = [...categoryProducts];
    if (sortOrder === 'asc') {
      sortedProducts.sort((a, b) => a.new_price - b.new_price);
    } else if (sortOrder === 'desc') {
      sortedProducts.sort((a, b) => b.new_price - a.new_price);
    }
    return sortedProducts;
  };

  const sortedProducts = getSortedProducts();

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
         <select value={sortOrder} onChange={(e) => handleSortChange(e.target.value)} className="shopcategory-sort">
          <option value="">Sort by</option>
          <option value="asc">Sort by Price: Low to High</option>
          <option value="desc">Sort by Price: High to Low</option>
        </select>
      </div>
      <div className="shopcategory-products">
        {sortedProducts.slice(0, displayCount).map((item, i) => (
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
