const express = require("express");   // import the express module and create an Express application
const app = express();     //routing HTTP requests

app.use(express.json())

//Route Imports
const product = require("./routes/productRoute");

app.use("/api/v1", product);

module.exports = app    //exports app