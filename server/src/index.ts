import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./interface/routes/userRoutes";
import { doctorRouter } from "./interface/routes/doctorRoutes";
import { adminRouter } from "./interface/routes/adminRoutes";
import {s3Router} from './interface/routes/s3Routes'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",  // allow requests from frontend
  credentials: true,                // allow cookies if needed
}));
app.use(express.json()); 
app.use(express.urlencoded({extended : true}));


//userroutes

app.use("/", userRouter)
app.use("/", doctorRouter)
app.use("/", adminRouter)

// s3 routes

app.use("/api" , s3Router)



// Start server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});