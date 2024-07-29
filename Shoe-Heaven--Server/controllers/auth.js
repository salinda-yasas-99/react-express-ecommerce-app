// import { db } from "../db.js"
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Login function user or admin
exports.loginUser = async (req, res, next) => {
  try {
    //const { email, password } = req.body;
    const email = req.body.email;
    const password = req.body.password;

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user.uid, // Use user.id instead of newUser.uid as the user object is already fetched
        username: user.username,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.status(200).json({ token: `${token}` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
};

//user authorize
exports.accessAuthorizeUser = async (req, res, next) => {
  let jwtToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    jwtToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log(`Token decoded successfully: ${JSON.stringify(decodedToken)}`);
    const uid = decodedToken.userId;
    console.log(`Decoded UID from token: ${uid}`);

    const userDb = await prisma.user.findUnique({
      where: {
        uid: parseInt(uid),
      },
    });

    if (userDb) {
      console.log(`User found: ${JSON.stringify(userDb)}`);
      if (
        userDb.role === "user" ||
        userDb.role === "admin" ||
        userDb.role === "order-manager"
      ) {
        return next();
      } else {
        console.error("You are unauthorized to perform this action");
        return res
          .status(403)
          .json({ error: "You are unauthorized to perform this action" });
      }
    } else {
      console.error("User not found");
      return res.status(403).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error while verifying token", err);
    return res.status(403).json({ error: "Error while verifying token" });
  }
};

//admin authorize
exports.accessAuthorizeAdmin = async (req, res, next) => {
  let jwtToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    jwtToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log(`Token decoded successfully: ${JSON.stringify(decodedToken)}`);
    const uid = decodedToken.userId;
    console.log(`Decoded UID from token: ${uid}`);

    const adminDb = await prisma.user.findUnique({
      where: {
        uid: parseInt(uid),
      },
    });

    if (adminDb) {
      console.log(`User found: ${JSON.stringify(adminDb)}`);
      if (adminDb.role === "admin") {
        return next();
      } else {
        console.error("You are unauthorized to perform this action");
        return res
          .status(403)
          .json({ error: "You are unauthorized to perform this action" });
      }
    } else {
      console.error("User not found");
      return res.status(403).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error while verifying token", err);
    return res.status(403).json({ error: "Error while verifying token" });
  }
};

//order-manager authorize
exports.accessAuthorizeOrder = async (req, res, next) => {
  let jwtToken;
  console.log("access -order");

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    jwtToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log(`Token decoded successfully: ${JSON.stringify(decodedToken)}`);
    const uid = decodedToken.userId;
    console.log(`Decoded UID from token: ${uid}`);

    const user = await prisma.user.findUnique({
      where: {
        uid: parseInt(uid),
      },
    });

    if (user) {
      console.log(`User found: ${user}`);
      if (user.role === "order-manager" || user.role === "admin") {
        return next();
      } else {
        console.error("You are unauthorized to perform this action");
        return res
          .status(403)
          .json({ error: "You are unauthorized to perform this action" });
      }
    } else {
      console.error("User not found");
      return res.status(403).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error while verifying token", err);
    return res.status(403).json({ error: "Error while verifying token" });
  }
};
