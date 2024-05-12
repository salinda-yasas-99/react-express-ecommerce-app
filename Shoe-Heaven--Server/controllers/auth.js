// import { db } from "../db.js"
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
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
