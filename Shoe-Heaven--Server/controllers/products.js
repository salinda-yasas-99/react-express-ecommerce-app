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
        description,
      },
    });

    const sizePromises = sizes.map((size) => {
      return prisma.productSizes.create({
        data: {
          sizeName: size.size,
          quantity: size.quantity,
          product: {
            connect: {
              prodId: prodId,
            },
          },
        },
      });
    });

    await Promise.all(sizePromises);

    res.status(201).json("Product created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error addinng product");
  }
};

exports.getAllsizes = async (req, res, next) => {
  try {
    // Fetch all users
    const productSizes = await prisma.productSizes.findMany();

    res.status(200).json(productSizes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
};

//get product by id
exports.getProductById = async (req, res, next) => {
  const productId = req.params.Id; // Assuming the product ID is passed as a URL parameter

  try {
    // Fetch the product by its ID, including the associated sizes
    const product = await prisma.product.findUnique({
      where: {
        prodId: productId,
      },
      select: {
        prodId: true,
        name: true,
        imageUrl: true,
        category: true,
        new_price: true,
        old_price: true,
        description: true,
        sizeItems: {
          select: {
            sizeId: true,
            sizeName: true,
            quantity: true,
            fk_prodId: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching product");
  }
};

//get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        prodId: true,
        name: true,
        imageUrl: true,
        category: true,
        new_price: true,
        old_price: true,
        description: true,
        sizeItems: {
          select: {
            sizeId: true,
            sizeName: true,
            quantity: true,
            fk_prodId: true,
          },
        },
      },
    });

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
    const new_price = parseInt(req.body.new_price);
    const old_price = parseInt(req.body.old_price);
    const sizeItems = req.body.sizeItems;
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
        description,
      },
    });

    for (const size of sizeItems) {
      await prisma.ProductSizes.update({
        where: { sizeId: size.sizeId },
        data: {
          sizeName: size.sizeName,
          quantity: size.quantity,
        },
      });
    }

    const changedProduct = { ...updatedProduct, sizeItems };

    // Respond with the updated product
    res.status(200).json(changedProduct);
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
