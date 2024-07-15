const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//register newuser
exports.addNewUser = async (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const Address = req.body.Address;
    const password = req.body.password;
    const contactNumber = req.body.contactNumber;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        role: "user",
        password: hashedPassword,
        contactNumber,
        Address,
      },
    });
    //const uid =newUser.uid
    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: newUser.uid,
        username: newUser.username,
        role: newUser.role,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );
    res.status(201).json({ token: `${token}` });
    // .then((newUser) => {

    // });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding user");
  }
};

//register newAdmin
exports.addNewAdmin = async (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const Address = req.body.Address;
    const password = req.body.password;
    const contactNumber = req.body.contactNumber;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        role: "admin",
        password: hashedPassword,
        contactNumber,
        Address,
      },
    });

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: newUser.uid,
        username: newUser.username,
        role: newUser.role,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );
    res.status(201).json({ token: `${token}` });
    // .then((newUser) => {

    // });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding admin");
  }
};

//get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    // Fetch all users
    const users = await prisma.user.findMany();

    // Exclude the password field from each user
    const usersWithoutPasswords = users.map((user) => ({
      uid: user.uid,
      username: user.username,
      email: user.email,
      role: user.role,
    }));

    res.status(200).json(usersWithoutPasswords);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
};

// Delete a single user by id
exports.deleteUser = async (req, res, next) => {
  let userId;
  try {
    // Extract userId from the request parameters
    userId = parseInt(req.params.Id);

    // Delete the user
    const deleteUser = await prisma.user.delete({
      where: {
        uid: userId, // Assuming 'id' is the unique identifier for users in your database
      },
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    console.log(`Attempting to delete user with ID: ${userId}`);
    res.status(500).send("Error deleting user");
  }
};

// Update user details
exports.updateUserDetails = async (req, res, next) => {
  try {
    // Extract userId from the request parameters
    const userId = parseInt(req.params.userId);

    // Extract new details from the request body
    const { username, contactNumber, Address } = req.body;

    // Update the user's details
    const updateUser = await prisma.user.update({
      where: {
        uid: userId,
      },
      data: {
        username,
        contactNumber,
        Address,
      },
    });

    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user details");
  }
};

// Get user details by ID without the password
exports.getUserById = async (req, res, next) => {
  try {
    // Extract userId from the request parameters
    const userId = parseInt(req.params.userId);

    // Retrieve the user's details
    const user = await prisma.user.findUnique({
      where: {
        uid: userId, // Assuming 'uid' is the unique identifier for users in your database
      },
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Construct the response object without the password field
    const { password, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user details");
  }
};
