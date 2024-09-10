//===vvv Imports dotenv package and configure it====
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const cors = require ("cors");

//===vvvImports  routes tp app.js from authRouter in routes folder====
const authRouter = require("./routes/authRouter");

const movieRouter = require("./routes/movieRouter")

const bookmarkRouter = require("./routes/bookmarkRouter");

//===vvv Imports the error file from the middleware folder====
const error = require("./middlewares/error");

//===vvv Spins up a new express application===
const app = express();

//===vvv Spins up the server or PORT====
const port = 4000; // or any 4 digit number

app.use(cors());

//===vvv===MiddleWare that allows access to the req.body on all request (without this you can not test on postman)=========
app.use(express.json());

// vvvMiddleWare for Login and registration for authentication route=====
app.use("/api/auth", authRouter); 

//=======Middle movie-router=========
app.use("/api/movie", movieRouter )

// ========BookMark Router=========

app.use("/api/bookmark", bookmarkRouter);


// =====Custom Middleware for errors=============
app.use(error)

//Start listening on a given port and run the callback function when it does=====
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");

    await app.listen(port, () => {
      console.log(`Server is Running on Port${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Unable to Connect");
    
  }
};

start ();

// seanlawson164us
// KQ2dX3lE3yEQbcD0

// mongodb+srv://seanlawson164us:KQ2dX3lE3yEQbcD0@cluster0.ez3z7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
