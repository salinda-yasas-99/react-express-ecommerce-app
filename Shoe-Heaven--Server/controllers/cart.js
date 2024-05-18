const { PrismaClient } = require("@prisma/client");
const { connect } = require("../routes/users");
const prisma = new PrismaClient();

exports.AddToCart = async (req, res, next) => {
  const userId = parseInt(req.params.uid); // Assuming the product ID is passed as a URL parameter

  try {
    const { subtotal, shippingFee, total, itemsCart } = req.body;

    const cartAvailvable = await prisma.cart.findUnique({
      where: {
        fk_userId: userId,
      },
      include: {
        cartItems: true,
      },
    });
    if (cartAvailvable) {
      // Delete existing cart items for the cart
      await prisma.cartItem.deleteMany({
        where: {
          fk_cartId: cartAvailvable.cartId,
        },
      });

      //updating cart
      const updateCart = await prisma.cart.update({
        where: {
          cartId: cartAvailvable.cartId,
        },
        data: {
          subtotal,
          shippingFee,
          total,
          //   user: {
          //     connect: {
          //       uid: userId,
          //     },
          //   },
        },
      });

      for (let item of itemsCart) {
        // Create a new cart item and associate it with the cart

        const product = await prisma.product.findUnique({
          where: {
            prodId: item.productId,
          },
        });
        if (!product) {
          return res
            .status(404)
            .send(`Product with id ${item.productId} not found`);
        }

        const productSize = await prisma.productSizes.findUnique({
          where: {
            sizeId: parseInt(item.sizeId),
          },
        });
        if (!productSize) {
          return res
            .status(404)
            .send(`Product size with id ${item.sizeId} not found`);
        }

        const newItem = await prisma.cartItem.create({
          data: {
            price: product.new_price,
            itemName: item.itemName,
            itemQuantity: item.itemQuantity,
            itemTotal: item.itemTotal,
            cart: {
              connect: {
                cartId: cartAvailvable.cartId,
              },
            },
            product: {
              connect: {
                prodId: item.productId,
              },
            },
            productSize: {
              connect: {
                sizeId: parseInt(item.sizeId),
              },
            },
          },
        });

        // Optionally, log or return the newly created cart item
        console.log(newItem);

        res.status(200).json({ message: "Cart and items updated succssfully" });
      }
    } else {
      const newCart = await prisma.cart.create({
        data: {
          subtotal,
          shippingFee,
          total,
          user: {
            connect: {
              uid: userId,
            },
          },
        },
      });

      const cartId = newCart.cartId;

      // Iterate over each item in itemsCart array
      for (let item of itemsCart) {
        // Create a new cart item and associate it with the cart

        const product = await prisma.product.findUnique({
          where: {
            prodId: item.productId,
          },
        });
        if (!product) {
          return res
            .status(404)
            .send(`Product with id ${item.productId} not found`);
        }

        const productSize = await prisma.productSizes.findUnique({
          where: {
            sizeId: parseInt(item.sizeId),
          },
        });
        if (!productSize) {
          return res
            .status(404)
            .send(`Product size with id ${item.sizeId} not found`);
        }

        const newItem = await prisma.cartItem.create({
          data: {
            price: product.new_price,
            itemName: item.itemName,
            itemQuantity: item.itemQuantity,
            itemTotal: item.itemTotal,
            cart: {
              connect: {
                cartId: cartId,
              },
            },
            product: {
              connect: {
                prodId: item.productId,
              },
            },
            productSize: {
              connect: {
                sizeId: parseInt(item.sizeId),
              },
            },
          },
        });

        // Optionally, log or return the newly created cart item
        console.log(newItem);
      }

      res.status(201).json({ message: "Cart and items added successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding cart and cart items");
  }
};

exports.GetCartByUserId = async (req, res, next) => {
  const userId = parseInt(req.params.uid);
  try {
    const userCart = await prisma.cart.findFirst({
      where: {
        user: {
          uid: Number(userId),
        },
      },
      include: {
        cartItems: true,
      },
    });

    if (!userCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json(userCart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user's cart");
  }
};

exports.GetAllCartsIncludingCartItems = async (req, res, next) => {
  try {
    const allCarts = await prisma.cart.findMany({
      include: {
        cartItems: true,
      },
    });

    if (allCarts.length === 0) {
      return res.status(404).json({ error: "No carts found" });
    }

    res.status(200).json(allCarts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving all carts");
  }
};
