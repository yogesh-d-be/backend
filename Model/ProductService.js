const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    
  

    s_id:{
        type:String
    },

    serviceCategory:{
        type:String
    },

    s_category:{
        type:String
    },
    c_category:{
        type:String
    },

    serviceName:{
        type:String,
        
    },
    
    serviceType:{
        type:String,
        
    },

    price:{
        type:Number,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    image:{
        type:String,
        require:true
    },

    details: [String]



})

const serviceProduct = mongoose.model("service",serviceSchema)

module.exports = serviceProduct;