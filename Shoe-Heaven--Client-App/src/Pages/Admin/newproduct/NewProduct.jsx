import React, { useState } from "react";
import "./NewProduct.css";
import Sidebar from "../../../Components/Admin-Dashboard/Sidebar/Sidebar";
import AdminNavbar from "../../../Components/Admin-Dashboard/Navbar/AdminNavbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Alert } from "@mui/material";

import axios from "axios";

const NewProduct = ({ title }) => {
  const initialProductData = {
    prodId: "",
    category: "women",
    imageUrl: "",
    name: "",
    old_price: "",
    new_price: "",
    sizes: [],
    description: "",
  };
  const availableSizes = [
    "size 3",
    "size 4",
    "size 5",
    "size 6",
    "size 7",
    "size 8",
    "size 9",
    "size 10",
  ];
  const [productData, setProductData] = useState(initialProductData);
  const [file, setFile] = useState(null);
  const [idError, setIdError] = useState("");
  const [formError, setFormError] = useState(""); // State to handle form validation messages
  const [successMessage, setSuccessMessage] = useState("");
  const [imageError, setImageError] = useState("");

  const validateProductId = async (prodId) => {
    const authToken = localStorage.getItem("access_token");
    try {
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });
      const response = await authAxios.get(
        `http://localhost:7000/api/products/IsIdAvailable/${prodId}`
      );
      if (response.data.isUnique) {
        setIdError("This product ID is already in use. Please choose another.");
        return false;
      } else {
        setIdError("");
        return true;
      }
    } catch (error) {
      console.error("Error validating product ID:", error);
      setIdError("Failed to validate product ID.");
      return false;
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "prodId") {
      await validateProductId(value);
    }
  };

  const handleSizeChange = (size, quantity) => {
    setProductData((prev) => {
      const sizes = [...prev.sizes];
      const sizeIndex = sizes.findIndex((s) => s.size === size);

      if (sizeIndex !== -1) {
        if (quantity > 0) {
          sizes[sizeIndex].quantity = quantity;
        } else {
          sizes.splice(sizeIndex, 1);
        }
      } else if (quantity > 0) {
        sizes.push({ size, quantity });
      }

      return { ...prev, sizes };
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const allFieldsFilled = () => {
    // New function to check if all fields are filled
    return (
      productData.prodId &&
      productData.category &&
      productData.name &&
      productData.old_price &&
      productData.new_price &&
      productData.description
    );
  };

  const Add_Product = async () => {
    if (!allFieldsFilled()) {
      setFormError("All fields must be filled out before adding a product."); // Set error if fields are missing
      setTimeout(() => setFormError(""), 5000);
      return;
    }
    setFormError(""); // Clear any existing error messages
    if (idError) {
      alert(idError);
      return;
    }
    if (!file) {
      setImageError("Please Select an Image");
      setTimeout(() => setImageError(""), 5000);
      return;
    }

    let formData = new FormData();
    formData.append("file", file);

    const authToken = localStorage.getItem("access_token");

    try {
      const response = await fetch("http://localhost:7000/upload", {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();

      if (responseData.success) {
        // Update image path in productData before sending to your product API
        const productWithImage = {
          ...productData,
          imageUrl: responseData.image_url,
          old_price: parseInt(productData.old_price), // Convert old_price to integer
          new_price: parseInt(productData.new_price),
        };
        console.log(productWithImage);
        const authToken = localStorage.getItem("access_token");
        // Post to your products API endpoint
        const authAxios = axios.create({
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true,
        });
        const productResponse = await authAxios.post(
          "http://localhost:7000/api/products/addProduct",
          productWithImage
        );

        setSuccessMessage("Product has been added successfully!"); // Set success message
        setTimeout(() => setSuccessMessage(""), 8000); // clear success message after 8 seconds
        setProductData(initialProductData);
        setFile(null);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <AdminNavbar />
        <div className="top">
          <h1>{title}</h1>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Product Preview"
            />

            <div className="formInput">
              <label htmlFor="file" className="file">
                Image:
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <DriveFolderUploadOutlinedIcon className="icon" />
              </label>

              {imageError && <Alert severity="error">{imageError}</Alert>}
            </div>
          </div>

          <div className="right">
            <div className="addproduct-itemfield">
              {formError && <Alert severity="error">{formError}</Alert>}
              <p>Product ID</p>
              <input
                value={productData.prodId}
                onChange={handleInputChange}
                type="text"
                name="prodId"
                placeholder="MEN-001/WOMEN-001/KIDS-001"
                required
              />
              {idError && <Alert severity="error">{idError}</Alert>}
            </div>

            <div className="addproduct-itemfield">
              <p>Product Category</p>
              <select
                value={productData.category}
                onChange={handleInputChange}
                name="category"
                className="add-product-selector"
              >
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
              </select>
            </div>

            <div className="addproduct-itemfield">
              <p>Product Name</p>
              <input
                value={productData.name}
                onChange={handleInputChange}
                type="text"
                name="name"
                placeholder="asics men shoe"
                required
              />
            </div>
            <div className="addproduct-itemfield">
              <p>Description</p>
              <input
                value={productData.description}
                onChange={handleInputChange}
                type="text"
                name="description"
                placeholder="Add a description here"
                required
              />
            </div>
            <div className="itemfield-prices">
              <div className="addproduct-itemfield">
                <p>Price</p>
                <input
                  value={productData.old_price}
                  onChange={handleInputChange}
                  type="number"
                  name="old_price"
                  placeholder="6000"
                  min="0"
                  required
                />
              </div>

              <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input
                  value={productData.new_price}
                  onChange={handleInputChange}
                  type="number"
                  name="new_price"
                  placeholder="5000"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="shoe-sizes">
              {availableSizes.map((size) => (
                <div className="size-with-quantity" key={size}>
                  <label>
                    <input
                      type="checkbox"
                      checked={
                        !!productData.sizes.find(
                          (s) => s.size === size && s.quantity > 0
                        )
                      }
                      onChange={(e) =>
                        handleSizeChange(size, e.target.checked ? 1 : 0)
                      }
                    />{" "}
                    {size}
                  </label>
                  <label htmlFor="qty" className="qty-label">
                    <input
                      type="number"
                      id="qty"
                      className="quantity"
                      value={
                        productData.sizes.find((s) => s.size === size)
                          ?.quantity || 0
                      }
                      onChange={(e) =>
                        handleSizeChange(size, parseInt(e.target.value))
                      }
                      min="0"
                    />
                    <span>Qty</span>
                  </label>
                </div>
              ))}
            </div>

            <button onClick={Add_Product} className="btn">
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
