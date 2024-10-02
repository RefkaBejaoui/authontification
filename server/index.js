const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./DB/connectDB")
connectDB();
app.use(express.json())

const userRouter = require("./Routes/UserRoute")
app.use("/auth", userRouter)



app.listen(process.env.PORT, (err) =>
  err
    ? console.error(err)
    : console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
