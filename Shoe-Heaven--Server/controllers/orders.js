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
