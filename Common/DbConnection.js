const mongoose = require("mongoose");

const Mongo_url= process.env.MONGODB

const connect = () => {
    mongoose.connect(Mongo_url, {
        dbName: 'loginuser', // Add your database name here
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MongoDB connected....")
    })
    .catch((err) => {
        console.log("Connection error:", err.message);
    });

}



module.exports = connect;