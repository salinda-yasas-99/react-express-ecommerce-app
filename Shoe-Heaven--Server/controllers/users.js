const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//adding newuser
exports.addNewUser = async (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const role = req.body.role;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user
      .create({
        data: {
          email,
          username,
          role,
          password: hashedPassword,
        },
      })
      .then((newUser) => {
        // Generate a JWT token
        const token = jwt.sign(
          {
            userId: newUser.id,
            username: newUser.username,
            role: newUser.role,
            email: newUser.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" } // Token expires in 1 hour
        );
        res.status(201).json({ token: `${token}` });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding user");
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
