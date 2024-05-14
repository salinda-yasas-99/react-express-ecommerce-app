const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.AddNewProduct = async (req, res, next) => {
  try {
    const prodId = req.body.prodId;
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const category = req.body.category;
    const new_price = req.body.new_price;
    const old_price = req.body.old_price;
    const sizes = req.body.sizes;
    const description = req.body.description;

    const newProduct = await prisma.product.create({
      data: {
        prodId,
        name,
        imageUrl,
        category,
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
    productId = req.params.Id;

    const deleteProd = await prisma.product.delete({
      where: {
        prodId: productId,
      },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).send("Error deleting product");
  }
};

exports.updateProductById = async (req, res, next) => {
  let productId;
  try {
    productId = req.params.Id;

    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const category = req.body.category;
    const new_price = req.body.new_price;
    const old_price = req.body.old_price;
    const sizes = req.body.sizes;
    const description = req.body.description;

    // Update the product
    const updatedProduct = await prisma.product.update({
      where: {
        prodId: productId,
      },
      data: {
        name,
        imageUrl,
        category,
        new_price,
        old_price,
        sizes,
        description,
      },
    });

    // Respond with the updated product
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);

    res.status(500).send("Error updating product");
  }
};

exports.checkProductId = async (req, res, next) => {
  let productId;
  try {
    productId = req.params.Id;
    const exisitingProd = await prisma.product.findUnique({
      where: {
        prodId: productId,
      },
    });
    if (exisitingProd) {
      return res.status(200).json({ isUnique: true });
    } else {
      return res.status(200).json({ isUnique: false });
    }
  } catch (err) {
    console.error(error);
    res.status(500).send(err.message);
  }
};

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
