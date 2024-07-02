const { PrismaClient } = require("@prisma/client");
const { connect } = require("../routes/users");
const prisma = new PrismaClient();

// exports.AddToCart = async (req, res, next) => {
//   const userId = parseInt(req.params.uid);

//   try {
//     const { subtotal, shippingFee, total, itemsCart } = req.body;

//     const cartAvailvable = await prisma.cart.findUnique({
//       where: {
//         fk_userId: userId,
//       },
//       include: {
//         cartItems: true,
//       },
//     });

//     if (cartAvailvable) {
//       // Delete existing cart items for the cart
//       await prisma.cartItem.deleteMany({
//         where: {
//           fk_cartId: cartAvailvable.cartId,
//         },
//       });

//       // Update cart
//       await prisma.cart.update({
//         where: {
//           cartId: cartAvailvable.cartId,
//         },
//         data: {
//           subtotal,
//           shippingFee,
//           total,
//         },
//       });

//       for (let item of itemsCart) {
//         const product = await prisma.product.findUnique({
//           where: {
//             prodId: item.itemId,
//           },
//         });
//         if (!product) {
//           return res
//             .status(404)
//             .send(`Product with id ${item.itemId} not found`);
//         }

//         const productSize = await prisma.productSizes.findUnique({
//           where: {
//             sizeId: parseInt(item.sizeId),
//           },
//         });
//         if (!productSize) {
//           return res
//             .status(404)
//             .send(`Product size with id ${item.sizeId} not found`);
//         }

//         await prisma.cartItem.create({
//           data: {
//             itemQuantity: parseInt(item.qty),
//             cart: {
//               connect: {
//                 cartId: cartAvailvable.cartId,
//               },
//             },
//             product: {
//               connect: {
//                 prodId: item.itemId,
//               },
//             },
//             productSize: {
//               connect: {
//                 sizeId: parseInt(item.sizeId),
//               },
//             },
//           },
//         });
//       }

//       return res
//         .status(200)
//         .json({ message: "Cart and items updated successfully" });
//     } else {
//       const newCart = await prisma.cart.create({
//         data: {
//           subtotal,
//           shippingFee,
//           total,
//           user: {
//             connect: {
//               uid: userId,
//             },
//           },
//         },
//       });

//       const cartId = newCart.cartId;

//       for (let item of itemsCart) {
//         const product = await prisma.product.findUnique({
//           where: {
//             prodId: item.itemId,
//           },
//         });
//         if (!product) {
//           return res
//             .status(404)
//             .send(`Product with id ${item.itemId} not found`);
//         }

//         const productSize = await prisma.productSizes.findUnique({
//           where: {
//             sizeId: parseInt(item.sizeId),
//           },
//         });
//         if (!productSize) {
//           return res
//             .status(404)
//             .send(`Product size with id ${item.sizeId} not found`);
//         }

//         await prisma.cartItem.create({
//           data: {
//             itemQuantity: parseInt(item.qty),
//             cart: {
//               connect: {
//                 cartId: cartId,
//               },
//             },
//             product: {
//               connect: {
//                 prodId: item.itemId,
//               },
//             },
//             productSize: {
//               connect: {
//                 sizeId: parseInt(item.sizeId),
//               },
//             },
//           },
//         });
//       }

//       return res
//         .status(201)
//         .json({ message: "Cart and items added successfully" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error adding cart and cart items");
//   }
// };

exports.AddToCart = async (req, res, next) => {
  const userId = parseInt(req.params.uid);

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
      // Update cart
      await prisma.cart.update({
        where: {
          cartId: cartAvailvable.cartId,
        },
        data: {
          subtotal,
          shippingFee,
          total,
        },
      });

      for (let item of itemsCart) {
        const product = await prisma.product.findUnique({
          where: {
            prodId: item.itemId,
          },
        });
        if (!product) {
          return res
            .status(404)
            .send(`Product with id ${item.itemId} not found`);
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

        const existingCartItem = await prisma.cartItem.findFirst({
          where: {
            fk_productId: item.itemId,
            fk_sizeId: parseInt(item.sizeId),
          },
        });

        console.log("this is existing cart item", existingCartItem);

        if (existingCartItem) {
          continue;
        } else {
          const created = await prisma.cartItem.create({
            //create item
            data: {
              itemQuantity: parseInt(item.qty),
              cart: {
                connect: {
                  cartId: cartAvailvable.cartId,
                },
              },
              product: {
                connect: {
                  prodId: item.itemId,
                },
              },
              productSize: {
                connect: {
                  sizeId: parseInt(item.sizeId),
                },
              },
            },
          });

          console.log("This is addedcart item", created);
        }
      }

      return res
        .status(200)
        .json({ message: "Cart and items updated successfully" });
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

      for (let item of itemsCart) {
        const product = await prisma.product.findUnique({
          where: {
            prodId: item.itemId,
          },
        });
        if (!product) {
          return res
            .status(404)
            .send(`Product with id ${item.itemId} not found`);
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

        await prisma.cartItem.create({
          data: {
            itemQuantity: parseInt(item.qty),
            cart: {
              connect: {
                cartId: cartId,
              },
            },
            product: {
              connect: {
                prodId: item.itemId,
              },
            },
            productSize: {
              connect: {
                sizeId: parseInt(item.sizeId),
              },
            },
          },
        });
      }

      return res
        .status(201)
        .json({ message: "Cart and items added successfully" });
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

    const renamedCart = {
      ...userCart,
      itemsCart: userCart.cartItems,
    };
    delete renamedCart.cartItems;

    res.status(200).json(renamedCart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user's cart");
  }
};

exports.IsCartAvailable = async (req, res, next) => {
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
      return res.status(404).json({ cart: "false" });
    }

    res.status(200).json({ cart: "false" });
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

// Delete a single product by id
// exports.DeleteCartItem = async (req, res, next) => {
//   let cItemId;
//   try {
//     cItemId = parseInt(req.params.id);

//     const deleteItem = await prisma.cartItem.delete({
//       where: {
//         cartItemId: cItemId,
//       },
//     });

//     res.status(200).json({ message: "cart item deleted successfully" });
//   } catch (error) {
//     console.error(error);

//     res.status(500).send("Error deleting cart item");
//   }
// };

exports.DeleteCartItem = async (req, res, next) => {
  let cItemId;
  try {
    cItemId = parseInt(req.params.Id);

    const deleteItem = await prisma.cartItem.delete({
      where: {
        cartItemId: cItemId,
      },
    });

    res.status(200).json({ message: "cart item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting cart item");
  }
};
