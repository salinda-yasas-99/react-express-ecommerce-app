const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// router.post("/payment", async (req, res) => {
//   const items = req.body.items;
//   const total = req.body.total;
//   const userId = req.body.userId;
//   try {
//     const newOrder = await prisma.order.create({
//       data: {
//         total: parseInt(total),
//         orderItems: JSON.stringify(items),
//         user: {
//           connect: {
//             uid: parseInt(userId),
//           },
//         },
//       },
//     });

//     //res.status(201).json(newOrder);
//     stripe.charges.create(
//       {
//         source: req.body.tokenId,
//         amount: req.body.amount,
//         currency: "LKR",
//       },
//       (stripeErr, stripeRes) => {
//         if (stripeErr) {
//           res.status(500).json(stripeErr);
//         } else {
//           res.status(200).json(stripeRes);
//         }
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error creating order");
//   }
// });

router.post("/payment", async (req, res) => {
  const { items, total, userId, tokenId, amount } = req.body;

  console.log("Received request body:", req.body);

  try {
    const newOrder = await prisma.order.create({
      data: {
        Total: parseInt(total),
        orderItems: items,
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
