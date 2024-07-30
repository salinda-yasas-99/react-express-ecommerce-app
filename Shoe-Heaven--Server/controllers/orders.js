const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllOrders = async (req, res, next) => {
  try {
    // Step 1: Fetch all orders and order them by date
    const orders = await prisma.order.findMany({
      orderBy: { date: "desc" },
    });

    // Step 2: Extract unique product and size IDs from order items
    const productIds = [];
    const sizeIds = [];
    orders.forEach((order) => {
      let parsedOrderItems;
      try {
        parsedOrderItems = JSON.parse(order.orderItems);
      } catch (e) {
        parsedOrderItems = order.orderItems;
      }
      parsedOrderItems.forEach((item) => {
        if (!productIds.includes(item.itemId)) {
          productIds.push(item.itemId);
        }
        if (item.sizeId && !sizeIds.includes(item.sizeId)) {
          sizeIds.push(item.sizeId);
        }
      });
    });

    // Step 3: Fetch product details
    const products = await prisma.product.findMany({
      where: {
        prodId: { in: productIds },
      },
    });

    // Create a mapping of productId to product details
    const productMap = {};
    products.forEach((product) => {
      productMap[product.prodId] = {
        name: product.name,
        imageUrl: product.imageUrl,
      };
    });

    // Fetch size details
    const sizes = await prisma.productSizes.findMany({
      where: {
        sizeId: { in: sizeIds },
      },
    });

    // Create a mapping of sizeId to size details
    const sizeMap = {};
    sizes.forEach((size) => {
      sizeMap[size.sizeId] = size.sizeName;
    });

    // Step 4: Enrich order items with product details, size details, format date/time, and include user names
    const enrichedOrders = orders.map(async (order) => {
      let parsedOrderItems;
      try {
        parsedOrderItems = JSON.parse(order.orderItems);
      } catch (e) {
        parsedOrderItems = order.orderItems;
      }

      const formattedDate = new Date(order.date).toDateString();

      // Fetch user details using fk_userId
      const user = await prisma.user.findUnique({
        where: { uid: parseInt(order.fk_userId) },
      });

      return {
        orderId: order.orderId,
        Total: order.Total,
        orderItems: parsedOrderItems.map((item) => ({
          ...item,
          productName: productMap[item.itemId]?.name,
          productImage: productMap[item.itemId]?.imageUrl,
          sizeName: sizeMap[item.sizeId],
        })),
        date: formattedDate,
        time: order.time,
        status: order.status,
        fk_userId: order.fk_userId,
        username: user?.username || "", // Include user name if available
      };
    });

    // Wait for all promises to resolve
    const resolvedEnrichedOrders = await Promise.all(enrichedOrders);

    res.status(200).json(resolvedEnrichedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching orders");
  }
};

// exports.getAllOrders = async (req, res, next) => {
//   try {
//     // Step 1: Fetch all orders and order them by date
//     const orders = await prisma.order.findMany({
//       orderBy: { date: "asc" },
//     });

//     // Step 2: Extract unique product IDs from order items
//     const productIds = [];
//     orders.forEach((order) => {
//       let parsedOrderItems;
//       try {
//         parsedOrderItems = JSON.parse(order.orderItems);
//       } catch (e) {
//         parsedOrderItems = order.orderItems;
//       }
//       parsedOrderItems.forEach((item) => {
//         if (!productIds.includes(item.itemId)) {
//           productIds.push(item.itemId);
//         }
//       });
//     });

//     // Step 3: Fetch product details
//     const products = await prisma.product.findMany({
//       where: {
//         prodId: { in: productIds },
//       },
//     });

//     // Create a mapping of productId to product details
//     const productMap = {};
//     products.forEach((product) => {
//       productMap[product.prodId] = {
//         name: product.name,
//         imageUrl: product.imageUrl,
//       };
//     });

//     // Step 4: Enrich order items with product details, format date/time, and include user names
//     const enrichedOrders = orders.map(async (order) => {
//       let parsedOrderItems;
//       try {
//         parsedOrderItems = JSON.parse(order.orderItems);
//       } catch (e) {
//         parsedOrderItems = order.orderItems;
//       }

//       const formattedDate = new Date(order.date).toDateString();
//       //const formattedTime = new Date(order.time).toTimeString().split(" ")[0];

//       // Fetch user details using fk_userId
//       const user = await prisma.user.findUnique({
//         where: { uid: parseInt(order.fk_userId) },
//       });

//       return {
//         orderId: order.orderId,
//         Total: order.Total,
//         orderItems: parsedOrderItems.map((item) => ({
//           ...item,
//           productName: productMap[item.itemId]?.name,
//           productImage: productMap[item.itemId]?.imageUrl,
//         })),
//         date: formattedDate,
//         time: order.time,
//         status: order.status,
//         fk_userId: order.fk_userId,
//         username: user?.username || "", // Include user name if available
//       };
//     });

//     // Wait for all promises to resolve
//     const resolvedEnrichedOrders = await Promise.all(enrichedOrders);

//     res.status(200).json(resolvedEnrichedOrders);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error fetching orders");
//   }
// };

// exports.getAllOrders = async (req, res, next) => {
//   try {
//     // Step 1: Fetch all orders and order them by date
//     const orders = await prisma.order.findMany({
//       orderBy: { date: "asc" },
//     });

//     // Step 2: Extract unique product IDs and size IDs from order items
//     const productIds = [];
//     const sizeIds = []; // Array to hold unique size IDs
//     orders.forEach((order) => {
//       let parsedOrderItems;
//       try {
//         parsedOrderItems = JSON.parse(order.orderItems);
//       } catch (e) {
//         parsedOrderItems = order.orderItems;
//       }
//       parsedOrderItems.forEach((item) => {
//         if (!productIds.includes(item.itemId)) {
//           productIds.push(item.itemId);
//         }
//         if (!sizeIds.includes(item.sizeId)) {
//           // Check for unique size IDs
//           sizeIds.push(item.sizeId);
//         }
//       });
//     });

//     console.log("This is the product ids", productIds);
//     console.log("This is the size ids", sizeIds);

//     // Step 3: Fetch product details and sizes
//     const products = await prisma.product.findMany({
//       where: {
//         prodId: { in: productIds },
//       },
//       include: {
//         sizeItems: true,
//       },
//     });

//     //console.log("This is the fetched products", products);

//     // Create a mapping of productId to product details and sizeNames
//     const productMap = {};
//     products.forEach((product) => {
//       const sizeNames = product.sizeItems
//         .map((size) => size.sizeName)
//         .join(", ");
//       productMap[product.prodId] = {
//         name: product.name,
//         imageUrl: product.imageUrl,
//         sizeNames: sizeNames, // Include size names in the map
//       };
//     });

//     // Create a mapping of sizeId to sizeName for easy lookup
//     const sizeMap = {};
//     sizeIds.forEach((sizeId) => {
//       const product = productMap[sizeId];
//       if (product) {
//         sizeMap[sizeId] = product.sizeNames; // Assuming one size per product for simplicity
//       }
//     });

//     console.log("This is sizemap ", sizeMap);

//     // Step 4: Enrich order items with product details, format date/time, and include user names
//     const enrichedOrders = orders.map(async (order) => {
//       let parsedOrderItems;
//       try {
//         parsedOrderItems = JSON.parse(order.orderItems);
//       } catch (e) {
//         parsedOrderItems = order.orderItems;
//       }

//       const formattedDate = new Date(order.date).toDateString();

//       // Fetch user details using fk_userId
//       const user = await prisma.user.findUnique({
//         where: { uid: parseInt(order.fk_userId) },
//       });

//       return {
//         orderId: order.orderId,
//         Total: order.Total,
//         orderItems: parsedOrderItems.map((item) => ({
//           ...item,
//           productName: productMap[item.itemId]?.name,
//           productImage: productMap[item.itemId]?.imageUrl,
//           sizeName: sizeMap[item.sizeId] || "", // Include size name if available
//         })),
//         date: formattedDate,
//         time: order.time,
//         status: order.status,
//         fk_userId: order.fk_userId,
//         username: user?.username || "", // Include user name if available
//       };
//     });

//     // Wait for all promises to resolve
//     const resolvedEnrichedOrders = await Promise.all(enrichedOrders);

//     res.status(200).json(resolvedEnrichedOrders);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error fetching orders");
//   }
// };

exports.getCurrentMonthOrders = async (req, res, next) => {
  try {
    // Calculate the start and end dates for the current month
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    // Convert the start and end dates to match the format stored in the database
    const startOfMonthFormatted = startOfMonth.toDateString();
    const endOfMonthFormatted = endOfMonth.toDateString();

    // Log the date range for debugging
    console.log("Start of month:", startOfMonthFormatted);
    console.log("End of month:", endOfMonthFormatted);

    // Fetch all orders for the current month and order them by date
    const orders = await prisma.order.findMany({
      where: {
        date: {
          gte: startOfMonthFormatted,
          lte: endOfMonthFormatted,
        },
      },
      orderBy: { date: "asc" },
    });

    // Log the fetched orders for debugging
    console.log("Fetched orders:", orders);

    // Extract unique product IDs from order items
    const productIds = [];
    orders.forEach((order) => {
      let parsedOrderItems;
      try {
        parsedOrderItems = JSON.parse(order.orderItems);
      } catch (e) {
        parsedOrderItems = order.orderItems;
      }
      parsedOrderItems.forEach((item) => {
        if (!productIds.includes(item.itemId)) {
          productIds.push(item.itemId);
        }
      });
    });

    // Fetch product details
    const products = await prisma.product.findMany({
      where: {
        prodId: { in: productIds },
      },
    });

    // Create a mapping of productId to product details
    const productMap = {};
    products.forEach((product) => {
      productMap[product.prodId] = {
        name: product.name,
        imageUrl: product.imageUrl,
      };
    });

    // Enrich order items with product details and format date/time
    const enrichedOrders = orders.map((order) => {
      let parsedOrderItems;
      try {
        parsedOrderItems = JSON.parse(order.orderItems);
      } catch (e) {
        parsedOrderItems = order.orderItems;
      }

      const formattedDate = new Date(order.date).toDateString();
      const formattedTime = new Date(`1970-01-01T${order.time}Z`)
        .toTimeString()
        .split(" ")[0];

      return {
        orderId: order.orderId,
        Total: order.Total,
        orderItems: parsedOrderItems.map((item) => ({
          ...item,
          productName: productMap[item.itemId]?.name,
          productImage: productMap[item.itemId]?.imageUrl,
        })),
        date: formattedDate,
        time: order.time,
        status: order.status,
        fk_userId: order.fk_userId,
      };
    });

    res.status(200).json(enrichedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching orders");
  }
};

// exports.getOrdersByUserId = async (req, res, next) => {
//   const userId = req.params.userId;

//   try {
//     // Fetch all orders that match the provided userId
//     const orders = await prisma.order.findMany({
//       where: { fk_userId: Number(userId) },
//     });

//     // Extract unique product IDs from order items
//     const productIds = [];
//     orders.forEach((order) => {
//       let parsedOrderItems;
//       try {
//         parsedOrderItems = JSON.parse(order.orderItems);
//       } catch (e) {
//         parsedOrderItems = order.orderItems;
//       }
//       parsedOrderItems.forEach((item) => {
//         if (!productIds.includes(item.itemId)) {
//           productIds.push(item.itemId);
//         }
//       });
//     });

//     // Fetch product details
//     const products = await prisma.product.findMany({
//       where: {
//         prodId: { in: productIds },
//       },
//     });

//     // Create a mapping of productId to product details
//     const productMap = {};
//     products.forEach((product) => {
//       productMap[product.prodId] = {
//         name: product.name,
//         imageUrl: product.imageUrl,
//       };
//     });

//     // Enrich order items with product details
//     const enrichedOrders = orders.map((order) => {
//       let parsedOrderItems;
//       try {
//         parsedOrderItems = JSON.parse(order.orderItems);
//       } catch (e) {
//         parsedOrderItems = order.orderItems;
//       }

//       return {
//         ...order,
//         orderItems: parsedOrderItems.map((item) => ({
//           ...item,
//           productName: productMap[item.itemId]?.name,
//           productImage: productMap[item.itemId]?.imageUrl,
//         })),
//       };
//     });

//     res.status(200).json(enrichedOrders);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error fetching orders");
//   }
// };

exports.getOrdersByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    // Fetch all orders that match the provided userId
    const orders = await prisma.order.findMany({
      where: { fk_userId: Number(userId) },
    });

    // Extract unique product and size IDs from order items
    const productIds = [];
    const sizeIds = [];
    orders.forEach((order) => {
      let parsedOrderItems;
      try {
        parsedOrderItems = JSON.parse(order.orderItems);
      } catch (e) {
        parsedOrderItems = order.orderItems;
      }
      parsedOrderItems.forEach((item) => {
        if (!productIds.includes(item.itemId)) {
          productIds.push(item.itemId);
        }
        if (item.sizeId && !sizeIds.includes(item.sizeId)) {
          sizeIds.push(item.sizeId);
        }
      });
    });

    // Fetch product details
    const products = await prisma.product.findMany({
      where: {
        prodId: { in: productIds },
      },
    });

    // Create a mapping of productId to product details
    const productMap = {};
    products.forEach((product) => {
      productMap[product.prodId] = {
        name: product.name,
        imageUrl: product.imageUrl,
      };
    });

    // Fetch size details
    const sizes = await prisma.productSizes.findMany({
      where: {
        sizeId: { in: sizeIds },
      },
    });

    // Create a mapping of sizeId to size details
    const sizeMap = {};
    sizes.forEach((size) => {
      sizeMap[size.sizeId] = size.sizeName;
    });

    // Enrich order items with product and size details
    const enrichedOrders = orders.map((order) => {
      let parsedOrderItems;
      try {
        parsedOrderItems = JSON.parse(order.orderItems);
      } catch (e) {
        parsedOrderItems = order.orderItems;
      }

      return {
        ...order,
        orderItems: parsedOrderItems.map((item) => ({
          ...item,
          productName: productMap[item.itemId]?.name,
          productImage: productMap[item.itemId]?.imageUrl,
          sizeName: sizeMap[item.sizeId],
        })),
      };
    });

    res.status(200).json(enrichedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching orders");
  }
};

exports.getTotalOrdersByMonth = async (req, res, next) => {
  try {
    // Fetch all orders
    const orders = await prisma.order.findMany();

    // Initialize an array with placeholders for each month from January to July
    const monthlyTotals = Array.from({ length: 7 }, (_, i) => ({
      name: new Date(2024, i, 1).toLocaleString("default", { month: "long" }),
      Total: 0,
    }));

    // Calculate totals for each month
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    for (let order of orders) {
      const orderDate = new Date(order.date);
      for (let month = 0; month < 7; month++) {
        const startOfCurrentMonth = new Date(
          startOfMonth.getFullYear(),
          month,
          1
        );
        const endOfCurrentMonth = new Date(
          startOfCurrentMonth.getFullYear(),
          startOfCurrentMonth.getMonth() + 1,
          0
        );

        if (orderDate >= startOfCurrentMonth && orderDate < endOfCurrentMonth) {
          // Increment the total for the month this order belongs to
          monthlyTotals[month].Total++;
          break; // Exit the loop once the month is found
        }
      }
    }

    // Return the results
    res.status(200).json(monthlyTotals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching monthly order totals");
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  const id = req.params.id;
  try {
    // Extract the order ID and new status from the request parameters and body

    const { status } = req.body;

    // // Validate the input
    // if (!id || !status) {
    //   return res.status(400).send("Missing order ID or status");
    // }

    // Fetch the order by ID
    const order = await prisma.order.findUnique({
      where: { orderId: Number(id) }, // Convert ID to number if it's stored as such
    });

    if (!order) {
      return res.status(404).send("Order not found");
    }

    // Update the order's status
    const updatedOrder = await prisma.order.update({
      where: { orderId: parseInt(id) },
      data: { status },
    });

    // Return the updated order
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating order status");
  }
};
