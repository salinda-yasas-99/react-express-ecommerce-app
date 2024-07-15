import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const { productId } = useParams();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/products/getAllProducts"
      );
      console.log(response.data);
      setProducts(response.data);
    } catch (err) {
      console.log("This is error", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchFeedbacks = async (productId) => {
    if (!productId) return;

    try {
      const response = await axios.get(
        `http://localhost:7000/api/feedbacks/get/${productId}`
      );
      console.log("fetch feedbacks", response.data);
      setFeedbacks(response.data);
    } catch (err) {
      console.log("This is error", err);
    }
  };

  const product = products.find((e) => e.prodId === productId);
  console.log(products);

  useEffect(() => {
    // Only call fetchFeedbacks if product is found
    if (product) {
      fetchFeedbacks(product.prodId);
    }
  }, [product]);

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} feedbacks={feedbacks} />
    </div>
  );
};

export default Product;
