const serviceProduct = require('../Model/ProductService')
const fs = require('fs');

const addService = async (req,res) => {

    let image_fileName = `${req.file.filename}`;

    const homeService = new serviceProduct({
        s_id:req.body.s_id,
        serviceCategory:req.body.serviceCategory,
        s_category:req.body.s_category,
        c_category:req.body.c_category,
        serviceName: req.body.serviceName,
        serviceType: req.body.serviceType,
        price: req.body.price,
        description: req.body.description,
        image: image_fileName,
        details: req.body.details 
        
    })

    try {
        await homeService.save();
        res.json({success:true, message: "Service Added"})
    } 
    catch (error) {
       console.log(error)
       res.json({success:false,message:"Error"}) 
    }
}

//List the service
const listService = async (req,res) => {
    try {
        const services = await serviceProduct.find({});
        res.json({success:true,data:services})
    } 
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})    
    }
}

//Remove service
const removeService = async(req,res) => {
    try {
        const service = await serviceProduct.findById(req.body.id)
        fs.unlink(`uploads/${service.image}`,()=>{})

        await serviceProduct.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Service Removed"})
    } 
    catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


module.exports = { 
    addService,
    listService, removeService
}



// const serviceProduct = require('../Model/ProductService')

// const getAllServices = async (req,res) =>{
//     try {
//         const services = await serviceProduct.find({});
        
//         res.json(services);
//     } 
//     catch (error) {
//         console.error(error);
//         res.status(500).json({message:"Server Error", details:error.message})
        
//     }
// }

// const getServicesById = async (req,res) =>{
//     try{
//         const getservices = await serviceProduct.findById(req.params.id);

//         res.json(getservices);
//     }
//     catch(error){
//         console.error(error);
//         res.status(500).json({message:"Server error", details:error.message})
//     }

// }

// module.exports = {
//     getAllServices,
//     getServicesById
// }

