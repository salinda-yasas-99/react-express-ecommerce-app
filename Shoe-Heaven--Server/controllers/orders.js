const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllOrders = async (req, res, next) => {
  try {
    // Fetch all orders and order them by date
    const orders = await prisma.order.findMany({
      orderBy: { date: "asc" },
    });

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
      const formattedTime = new Date(order.time).toTimeString().split(" ")[0];

      return {
        orderId: order.orderId,
        Total: order.Total,
        orderItems: parsedOrderItems.map((item) => ({
          ...item,
          productName: productMap[item.itemId]?.name,
          productImage: productMap[item.itemId]?.imageUrl,
        })),
        date: formattedDate,
        time: formattedTime,
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
        time: formattedTime,
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

exports.getOrdersByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    // Fetch all orders that match the provided userId
    const orders = await prisma.order.findMany({
      where: { fk_userId: Number(userId) },
    });

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

    // Enrich order items with product details
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
