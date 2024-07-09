const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.AddNewFeedBack = async (req, res, next) => {
  try {
    const stars = req.body.stars;
    const comment = req.body.comment;
    const prodID = req.body.prodID;
    const userID = req.body.userID;

    const newPFeed = await prisma.feedBack.create({
      data: {
        stars,
        comment,

        user: {
          connect: {
            uid: parseInt(userID), // Assuming `id` is the unique identifier for users
          },
        },
        product: {
          connect: {
            prodId: prodID, // Assuming `prodID` is the unique identifier for products
          },
        },
      },
    });

    res.status(201).json("Feedback created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error addinng feeedback");
  }
};

//get feedback by id

exports.getFeedbackByID = async (req, res, next) => {
  const productId = req.params.Id;

  try {
    const feedbacksWithUsername = await prisma.feedBack.findMany({
      where: {
        fk_prodId: productId,
      },
      include: {
        user: true,
      },
    });

    const feedbacksWithUsernames = feedbacksWithUsername.map((feedback) => ({
      //   ...feedback,
      FeedId: feedback.FeedId,
      stars: feedback.stars,
      comment: feedback.comment,
      fk_prodId: feedback.fk_prodId,
      fk_userId: feedback.fk_userId,
      username: feedback.user.username,
    }));

    res.status(200).json(feedbacksWithUsernames);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).send("Error fetching feedbacks");
  }
};
