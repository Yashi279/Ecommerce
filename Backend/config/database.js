const mongoose = require("mongoose"); //importing mongoose



// function to connect with database
const connectDatabse =()=>{
    mongoose.connect(`${process.env.DB_URI}`, {useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,})
    .then((data)=>{
            console.log(`Mongodb connected with server: ${data.connection.host}`); // if connection is established then it will print the statment on console
        });

}


module.exports = connectDatabse 