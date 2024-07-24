import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  DialogContentText,
} from "@mui/material";

const ProductDataTable = () => {
  const [productData, setProductData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editProductData, setEditProductData] = useState({});
  const availableSizes = [3, 4, 5, 6, 7, 8, 9, 10];
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/products/getAllProducts"
        );
        console.log("Fetched products:", response.data);
        const updatedProductData = response.data.map((product) => ({
          ...product,
          sizes: product.sizeItems.map(sizeItem => ({
            sizeId: sizeItem.sizeId,
            sizeName: sizeItem.sizeName,
            quantity: sizeItem.quantity
          })),
        }));
        setProductData(updatedProductData);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const handleEditOpen = (product) => {
    setEditProductData({
      ...product,
      sizes: product.sizes,
    });
    setEditOpen(true);
  };

  const handleUpdateProduct = async () => {
    console.log("Updating product with data:", editProductData);
    try {
      const updatedProductData = {
        ...editProductData,
        sizes: editProductData.sizes,
      };
      const response = await axios.put(
        `http://localhost:7000/api/products/update/${editProductData.prodId}`,
        updatedProductData
      );
      console.log("Update response:", response);
      if (response.data) {
        const updatedProducts = productData.map((prod) =>
          prod.prodId === editProductData.prodId
            ? { ...prod, ...response.data, sizes: response.data.sizeItems }
            : prod
        );

        setProductData(updatedProducts);

        setSuccessMessage("Product Updated Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        setEditOpen(false);
      }
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleSizeQuantityChange = (sizeId, sizeName, quantity) => {
    setEditProductData((prev) => {
      const currentSizes = prev.sizes;
      const sizeIndex = currentSizes.findIndex((s) => s.sizeId === sizeId);
      let newSizes;

      if (sizeIndex === -1) {
        newSizes = [...currentSizes, { sizeId, sizeName, quantity }];
      } else {
        newSizes = currentSizes.map((s, index) =>
          index === sizeIndex ? { sizeId, sizeName, quantity } : s
        );
      }

      return { ...prev, sizes: newSizes };
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/products/delete/${id}`);
      setProductData(productData.filter((p) => p.prodId !== id));
      setOpen(false);
    } catch (error) {
      console.error("Failed to delete the product", error);
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Product
        <Link to="/dashboard/products/new" className="link">
          Add New
        </Link>
      </div>

      {successMessage && (
        <p
          className="successMessage"
          style={{
            color: "green",
            fontSize: "16px",
            paddingLeft: "10px",
            paddingBottom: "8px",
          }}
        >
          {successMessage}
        </p>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData.map((product) => (
              <TableRow key={product.prodId}>
                <TableCell component="th" scope="row">
                  {product.prodId}
                </TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="right">{product.new_price}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleEditOpen(product)}>Edit</Button>
                  <Button
                    onClick={() => {
                      setOpen(true);
                      setEditProductData(product);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editOpen && (
        <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
          <DialogTitle>Edit Product</DialogTitle>

          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Product Name"
              type="text"
              fullWidth
              value={editProductData.name}
              onChange={(e) =>
                setEditProductData({ ...editProductData, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              value={editProductData.description}
              onChange={(e) =>
                setEditProductData({
                  ...editProductData,
                  description: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="old_price"
              label="Old Price"
              type="number"
              fullWidth
              value={editProductData.old_price}
              onChange={(e) =>
                setEditProductData({
                  ...editProductData,
                  old_price: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="new_price"
              label="New Price"
              type="number"
              fullWidth
              value={editProductData.new_price}
              onChange={(e) =>
                setEditProductData({
                  ...editProductData,
                  new_price: e.target.value,
                })
              }
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={editProductData.category}
                onChange={(e) =>
                  setEditProductData({
                    ...editProductData,
                    category: e.target.value,
                  })
                }
              >
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="kid">Kids</MenuItem>
              </Select>
            </FormControl>

            {/* Table to show sizes and quantities */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 450 }} aria-label="sizes table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Size</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {editProductData.sizes.map((size) => (
                    <TableRow key={size.sizeId}>
                      <TableCell align="center">{size.sizeName}</TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          value={size.quantity}
                          onChange={(e) =>
                            handleSizeQuantityChange(
                              size.sizeId,
                              size.sizeName,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateProduct}>Save</Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => handleDelete(editProductData.prodId)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductDataTable;
