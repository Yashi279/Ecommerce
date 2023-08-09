const app = require("./app"); // import app

const dotenv = require("dotenv"); //import dotenv 
const connectDatabase = require("./config/database") // import database


//Config

dotenv.config({path: "Backend/config/config.env"});

// Connecting to database
connectDatabase();







app.listen(process.env.PORT, ()=>{

    console.log(`Server is working on http://localhost:${process.env.PORT}`)
}) 
