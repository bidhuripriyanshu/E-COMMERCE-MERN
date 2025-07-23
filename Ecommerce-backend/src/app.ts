import express, { NextFunction } from "express";
const app = express();
const port = 4000;
import { connectDB } from './utils/features.js';
import { errorMiddleware } from "./middlewares/error.js";


app.use(express.json());
app.use("/uploads",express.static("uploads"));

// importing routes
import userRoute from "./routes/user.js"
import productRoute from './routes/product.js'



connectDB();


app.get("/", (req, res) => {
  res.send("API Working with /api/v1")
})


// using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product",productRoute);




app.use(errorMiddleware)

app.listen(port, () => {
  console.log("server is working on localhost");
})