const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { use } = require("../routes/users");
const prisma = new PrismaClient();

//register newuser
exports.addNewUser = async (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    //const role = req.body.role;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        role: "user",
        password: hashedPassword,
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
    //const role = req.body.role;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        role: "admin",
        password: hashedPassword,
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

// exports.getUsers = (req, res) => {
//   const query = "SELECT * FROM users";
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching users:", err);
//       res.status(500).json({ error: "Failed to fetch users" });
//       return;
//     }
//     res.json(results);
//   });
// };

// exports.deleteUser = (req, res) => {
//   const userId = req.params.id;
//   const sql = "DELETE FROM users WHERE id=?";

//   db.query(sql, [userId], (err, result) => {
//     if (err) {
//       console.error("Error deleting user:", err);
//       return res.status(500).json({ message: "Failed to delete the user" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json({ message: "User deleted successfully" });
//   });
// };
