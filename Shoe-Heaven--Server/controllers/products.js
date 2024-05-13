const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.AddNewProduct = async (req, res, next) => {
  try {
    const prodId = req.body.prodId;
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const catergory = req.body.catergory;
    const new_price = req.body.new_price;
    const old_price = req.body.old_price;
    const sizes = req.body.sizes;
    const description = req.body.description;

    const newProduct = await prisma.product.create({
      data: {
        prodId,
        name,
        imageUrl,
        catergory,
        new_price,
        old_price,
        sizes,
        description,
      },
    });

    res.status(201).json("Product created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error addinng product");
  }
};

//get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    // Fetch all users
    const products = await prisma.product.findMany();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
};

// Delete a single product by id
exports.deleteUser = async (req, res, next) => {
  let productId;
  try {
    // Extract userId from the request parameters
    productId = req.params.Id;

    // Delete the user
    const deleteProduct = await prisma.product.delete({
      where: {
        prodId: productId, // Assuming 'id' is the unique identifier for users in your database
      },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).send("Error deleting user");
  }
};

// import { db } from "../db.js";

// export const createProduct = (req, res) => {
//     const { id, name, image, category, new_price, old_price,sizes,description } = req.body;
//     console.log(sizes);

//     const sql = `INSERT INTO product (id, name, image, category, new_price, old_price,sizes,description)
//                  VALUES (?, ?, ?, ?, ?, ?,?,?)`;

//     db.query(sql, [id, name, image, category, new_price, old_price,JSON.stringify(sizes),description],  (err, result) => {
//         if (err) {
//             res.status(500).send("Error adding product to database: " + err.message);
//             console.error(err);
//             return;
//         }
//         res.status(201).send(`Product added with ID: ${id}`);
//     });
// };

// export const deleteProduct = (req,res)=>{
//     const { id } = req.params;
//     const sql = 'DELETE FROM product WHERE id = ?';
//     db.query(sql, [id], (err, result) => {
//         if (err) {
//             res.status(500).send('Error deleting product from database');
//             console.error(err);
//             return;
//         }
//         if (result.affectedRows === 0) {
//             res.status(404).send('No product found with the given ID');
//         } else {
//             res.status(200).send(`Product with ID: ${id} deleted successfully`);
//         }
//     });
// }

// export const getAllProducts = (req,res) =>{

//     db.query("SELECT * FROM product", (err, results) => {
//         if (err) throw err;
//         res.json(results);
//       });
// }

// export const checkProductId = async (req,res)=>{
//      const {id} =req.query;
//      if (!id) {
//         return res.status(400).send({ message: 'Product ID is required' });
//     }

//     const sql = 'SELECT COUNT(*) AS count FROM product WHERE id = ?';
//     db.query(sql, [id], (err, results) => {
//         if (err) {
//             console.error('Database error:', err);
//             return res.status(500).send({ message: 'Error checking product ID' });
//         }
//         if (results[0].count > 0) {
//             res.send({ isUnique: false });
//         } else {
//             res.send({ isUnique: true });
//         }
//     });
// }

// export const updateProduct = (req,res)=>{
//     const {id} = req.params;
//     const { name, image, category, new_price, old_price, sizes,description } = req.body;

//     const sql = `UPDATE product SET name = ?, image = ?, category = ?, new_price = ?, old_price = ?, sizes = ? , description = ? WHERE id = ?`;

//     db.query(sql, [name, imageUrl, category, new_price, old_price, JSON.stringify(sizes), description,id], (err, result) => {
//         if (err) {
//             res.status(500).send("Error updating product in database: " + err.message);
//             console.error(err);
//             return;
//         }
//         if (result.affectedRows === 0) {
//             res.status(404).send("Product not found");
//         } else {
//             res.status(200).send(`Product with ID: ${id} updated successfully`);
//         }
//     });
// }
