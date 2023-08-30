const express = require("express");   // import the express module and create an Express application
const app = express();     //routing HTTP requests
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");
app.use(express.json());
app.use(cookieParser());

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app    //exports app