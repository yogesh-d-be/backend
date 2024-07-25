const express = require('express');
const multer = require("multer");
const contactRouter = express.Router();
const { verifyToken } = require('../Middleware/Auth');
const {createContactUserData, contactUserDataGet} = require('../Controller/ContactController');

const storage = multer.diskStorage({
    destination: "./Public/ContactFile",
    filename: (req,file,cb) =>{
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req,file,cb) =>{
    const validFileTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document' ]
    if(validFileTypes.includes(file.mimetype)){
        cb(null,true);
    }
    else{
        cb(new Error("Invalid file type"))
    }
}


const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize: 1024 * 1024 * 5 // 5mb
    }
})

function multerErrorHandler(err,req,res,next){
    if(err instanceof multer.MulterError){
        if(err.code === 'LIMIT_FILE_SIZE'){
            return res.status(400).json({success:false, message:"File limit exceeds of 5mb"})
        }
        return res.status(400).json({success:false, message:err.message})
    }
    else if(err){
       // An unknown error occurred when uploading.
       return res.status(400).json({ success: false, message: err.message });
    }
    // If no error, proceed to the next middleware/route handler
    next();
}

contactRouter.post("/form",verifyToken, upload.single("contactFile"),multerErrorHandler,createContactUserData);
contactRouter.get("/listform",contactUserDataGet)

module.exports = contactRouter;