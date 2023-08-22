const app = require("./app"); // import app

const dotenv = require("dotenv"); //import dotenv 
const connectDatabase = require("./config/database") // import database

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});
//Config

dotenv.config({path: "Backend/config/config.env"});

// Connecting to database
connectDatabase(); //calling function


const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
}) 

//Unhandled Promise Rejections
process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })
}); 