import express, { NextFunction } from "express";
const app = express();
const port = 4000;
import {connectDB} from './utils/features.js';




// importing routes
import userRoute from "./routes/user.js"
import { errorMiddleware } from "./middlewares/error.js";
app.use(express.json());

connectDB();
app.get("/",(req,res)=>{
    res.send("API Working with /api/v1")
})
// using routes
app.use("/api/v1/user",userRoute);

app.use(errorMiddleware)
app.listen(port,()=>{
  console.log("server is working on localhost");
})