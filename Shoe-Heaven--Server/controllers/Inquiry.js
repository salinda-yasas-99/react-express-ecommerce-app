const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addNewInquiry = async (req, res, next) => {
  try {
    const name = req.body.name;
    const subject = req.body.subject;
    const message = req.body.message;

    const newFeedBack = await prisma.Inquiry.create({
      data: {
        name,
        subject,
        message,
      },
    });
    res.status(201).json({ message: "Inquiry added successfully" });

    // });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding inquiry");
  }
};

exports.getAllInquiry = async (req, res, next) => {
  try {
    const feedbacks = await prisma.Inquiry.findMany();

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching inquries");
  }
};

exports.deleteInquiry = async (req, res, next) => {
  let inqId;
  try {
    inqId = parseInt(req.params.Id);

    const deleteInq = await prisma.Inquiry.delete({
      where: {
        InqId: inqId,
      },
    });

    res.status(200).json({ message: "inquiry deleted successfully" });
  } catch (error) {
    console.error(error);
    console.log(`Attempting to delete user with ID: ${userId}`);
    res.status(500).send("Error deleting user");
  }
};
