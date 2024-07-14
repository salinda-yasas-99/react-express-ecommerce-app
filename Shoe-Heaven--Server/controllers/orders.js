const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllOrders = async (req, res, next) => {
  try {
    // Fetch all users
    const orders = await prisma.order.findMany();

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
};

// exports.getOrdersByUserId = async (req, res, next) => {
//   // Extract the userId from the request parameters or body
//   const userId = req.params.userId; // Assuming the parameter name is 'userId'

//   try {
//     // Fetch all orders that match the provided userId
//     const orders = await prisma.order.findMany({
//       where: {
//         fk_userId: Number(userId),
//       },
//     });

//     res.status(200).json(orders);
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

    // Assuming you have a mapping function or object that maps itemId to productName
    const itemIdToProductNameMap = {
      // Example mapping
      "men-001": "Deck Shoe",
      // Add more mappings as needed
    };

    // Check if orderItems is already an object/array and proceed accordingly
    const enrichedOrders = orders.map((order) => {
      let parsedOrderItems;
      try {
        // Attempt to parse orderItems if it's a stringified JSON
        parsedOrderItems = JSON.parse(order.orderItems);
      } catch (e) {
        // If parsing fails, assume orderItems is already an object/array
        parsedOrderItems = order.orderItems;
      }

      return {
        ...order,
        orderItems: parsedOrderItems.map((item) => ({
          ...item,
          productName: itemIdToProductNameMap[item.itemId],
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
