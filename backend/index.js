const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { connection } = require("./config/db");
const authController = require("./controllers/authController");
const roomController = require("./controllers/roomController");

const app = express();

// DB connection
mongoose.set("strictQuery", false);

// MiddleWares
// The below two are must if we use req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authController);
app.use("/room", roomController);

// Starting the Server
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error connecting to Database");
    console.log(error);
  }
  console.log(`App is runnign at port ${process.env.PORT}`);
});
