const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/payment", async (req, res) => {
  const { items, total, userId, tokenId, amount } = req.body;

  console.log("Received request body:", req.body);

  try {
    for (let item of items) {
      const productItem = await prisma.productSizes.findUnique({
        where: {
          sizeId: parseInt(item.sizeId),
        },
      });
      console.log(`This is found porduct size:`, productItem);
      if (productItem.quantity > parseInt(item.qty)) {
        const quantity = parseInt(productItem.quantity) - parseInt(item.qty);
        const updatedProductSize = await prisma.productSizes.update({
          where: { sizeId: item.sizeId },
          data: { quantity },
        });
        console.log(`Updated product size: ${updatedProductSize}`);
      } else {
        res.status(500).send("Order cannot be placed. It is out of stock");
      }
    }

    const now = new Date();
    // const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0];

    const dateTime = now.toDateString();

    const newOrder = await prisma.order.create({
      data: {
        Total: parseInt(total),
        orderItems: items,
        date: dateTime,
        time: time,
        user: {
          connect: {
            uid: parseInt(userId),
          },
        },
      },
    });

    console.log("Order created:", newOrder);

    stripe.charges.create(
      {
        source: tokenId,
        amount: amount,
        currency: "LKR",
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          console.error("Stripe error:", stripeErr);
          res.status(500).json(stripeErr);
        } else {
          console.log("Stripe response:", stripeRes);
          res.status(200).json(stripeRes);
        }
      }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
  }
});

module.exports = router;
