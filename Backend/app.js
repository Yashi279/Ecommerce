const express = require("express");   // import the express module and create an Express application
const app = express();     //routing HTTP requests

const errorMiddleware = require("./middleware/error");
app.use(express.json())

//Route Imports
const product = require("./routes/productRoute");

app.use("/api/v1", product);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app    //exports app