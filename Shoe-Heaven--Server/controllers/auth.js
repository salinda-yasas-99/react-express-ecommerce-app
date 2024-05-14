// import { db } from "../db.js"
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//const jwtDecode = require("jwt-decode");

// Login function user
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
    const decodedToken = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET.toString()
    );
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
      if (user.role === "user") {
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
    var idTok = req.headers.authorization.split("Bearer ")[1];
    jwtToken = idTok;
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(jwtToken);
    const uid = decodedToken.uid;
    const userSnapshot = await prisma.user.findUnique({
      where: {
        uid: parseInt(uid),
      },
    });
    if (userSnapshot) {
      if (userData.role === "admin") {
        return next();
      } else {
        console.error({ error: "you are unauthorised to perform this action" });
        return res
          .status(403)
          .json(`you are unauthorised to perform this action`);
      }
    } else {
      console.error("User not found");
      return res.status(403).json({ error: "user not found" });
    }
  } catch (err) {
    console.error("Error while verifying token", err);
    return res.status(403).json({ error: "Error while verifying token" });
  }
};

// export const register = (req,res)=>{
//         // res.json("from controller")
//         if (!req.body.username || !req.body.address || !req.body.email || !req.body.contact_number || !req.body.password) {
//             return res.status(400).json("Please fill out all the fields");
//         }

//         if (!/^\d+$/.test(req.body.contact_number)) {
//             return res.status(400).json("Contact number must contain only numeric characters");
//         }

//         if (!/^\d{10}$/.test(req.body.contact_number)) {
//             return res.status(400).json("Contact number must be exactly 10 digits");
//         }
//         const q= "SELECT * FROM users WHERE email=? OR  username = ?"

//         db.query(q,[req.body.email,req.body.username],(err,data)=>{
//                 if(err) return res.json(err)
//                 if(data.length) return  res.status(409).json("User already Exists")

//                 // hash the password
//                     const salt = bcrypt.genSaltSync(10);
//                     const hash = bcrypt.hashSync(req.body.password,salt);

//                    const q = "INSERT INTO users (`username`, `address`, `email`,`contact_number`,`password`) VALUES (?)" ;

//                     const values =[
//                         req.body.username,
//                         req.body.address,
//                         req.body.email,
//                         req.body.contact_number,
//                         hash
//                     ]

//                     db.query(q,[values],(err,data)=>{
//                         if(err) return res.json(err)
//                         return res.status(200).json("User has been created");
//                     })
//             })
// }

// // export const login = (req,res)=>{
// //     // check the availability of user
// //     const q = "SELECT * FROM users WHERE username =?"

// //     db.query(q,[req.body.username],(err,data)=>{
// //         if(err) return res.json(err);
// //         if(data.length ===0) return res.status(404).json("User not Found");

// //         // check password
// //         const isPasswordCorrect =  bcrypt.compareSync(req.body.password,data[0].password)
// //         if(!isPasswordCorrect) return  res.status(400).json("Wrong username or Password");

// //         // return res.status(200).json("Login Succeed");
// //         const token = jwt.sign({id:data[0].id},"jwtkey")
// //         const {password,...other} = data[0];
// //         res.cookie("access_token",token,{
// //             httpOnly:true
// //         }).status(200).json(other);
// //     })

// // }

// export const login = (req, res) => {
//     const q = "SELECT * FROM users WHERE username = ?";
//     db.query(q, [req.body.username], (err, data) => {
//         if (err) return res.json(err);
//         if (data.length === 0) return res.status(404).json("User not found");

//         const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
//         if (!isPasswordCorrect) return res.status(400).json("Wrong username or password");

//         const token = jwt.sign({ id: data[0].id }, "jwtkey");
//         const { password, ...other } = data[0];
//         res.status(200).json({ ...other, token }); // Send token in the response body

//     });
// };

// export const logout = (req,res)=>{

// }
