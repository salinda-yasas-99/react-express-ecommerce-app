import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import path from 'path';

import multer from 'multer';

const app = express();
const PORT = 7000;
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'


app.use(cors())
app.use(express.json())
app.use(cookieParser())



app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/product',productRoutes);


// Image Storage Engine
const storage = multer.diskStorage({
  destination:'./upload/images',
  filename:(req,file,cb)=>{
      return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({storage:storage})

// uploading endpoint for images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('file'),(req,res)=>{
  res.json({
    success:1,
    image_url:`http://localhost:${PORT}/images/${req.file.filename}`
  })
})






app.listen(PORT,()=>{
    console.log(`Server is Running on port ${PORT}`);
})