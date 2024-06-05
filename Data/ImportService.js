// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const fs = require('fs');
// const serviceProduct = require('../Model/ProductService');


// dotenv.config();




// const Mongo_url= process.env.MONGODB

// const connect = () => {
//     mongoose.connect(Mongo_url, {
//         dbName: 'loginuser', // Add your database name here
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => {
//         console.log("MongoDB connected....")
//     })
//     .catch((err) => {
//         console.log("Connection error:", err.message);
//     });

// }

// connect();
// // Delete existing documents

// const deleteServices = async () =>{
//     try{
       
//         serviceProduct.deleteMany({});
//         console.log("Data successfully deleted");
//     }
//     catch(err){
//         console.log(err.message)
//     }
//     process.exit();
// }


// //Import serviceProduct data to mongodb

// const importServices = async () =>{
//     try {
//         const services = JSON.parse(fs.readFileSync('./Data/ServicesProduct.json','utf-8'))
//         await serviceProduct.create(services);
//         console.log("Data successfully imported")
//     } 
//     catch (error) {
//         console.log(err.message)    
//     }
//     process.exit();
// }

// // Function to connect to MongoDB and execute import or delete based on command-line arguments

//         // Connect to MongoDB
//         // const args = process.argv.slice(2); // Get command-line arguments
//         if (process.argv[2] === '--import') {
//             importServices(); // Import data if --import argument is present
//         } 
//         if (process.argv[2] === '--delete') {
//             deleteServices(); // Delete data by default
//         }
//         // Close the MongoDB connection
       
    
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const serviceProduct = require('../Model/ProductService');
// const connect = require('../Common/DbConnection')

dotenv.config();

const Mongo_url = process.env.MONGODB;

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


const deleteServices = async () => {
    try {
        await serviceProduct.deleteMany({});
        console.log("Data successfully deleted");
    } catch (err) {
        console.log("Deletion error:", err.message);
    }
    process.exit();
};

const importServices = async () => {
    try {
        const services = JSON.parse(fs.readFileSync('./Data/ServicesProduct.json', 'utf-8'));
        await serviceProduct.create(services);
        console.log("Data successfully imported");
    } catch (error) {
        console.log("Import error:", error.message);
    }
    process.exit();
};


    connect();
    if (process.argv[2] === '--import') {
         importServices();
    } else if (process.argv[2] === '--delete') {
         deleteServices();
    } else {
        console.log("Invalid command. Please specify --import or --delete.");
        process.exit(1);
    }
    

//To import the data 
//node Data/ImportService.js --import     in this Data is folder, ImportService is js file

//To delete the data
//node Data/ImportService.js --delete


