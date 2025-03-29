import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser'; // for read the cookie

dotenv.config();

mongoose.connect(
    process.env.MONGO  // connect to .env file 
)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log("Error connecting to MongoDB", err);
});

const app = express();

app.use(express.json()); //allow json to input as backend 
app.use(cookieParser()); // to read the cookie


app.listen(3000,()=>{
    console.log("server is running on port 3000 ");
})

//api test
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

//middleware for handle things 

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        sucess:false,
        statusCode,
        message
    });
});