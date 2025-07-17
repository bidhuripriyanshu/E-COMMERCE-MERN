import express from "express";
const app = express();
const port = 3000;

// importing routes
import userRoute from "./routes/user.js"




// using routes
app.use("/api/v1/user",userRoute);

app.listen(port,()=>{
  console.log("server is working on localhost");
})