const express = require('express');
const multer = require('multer');

const {addService,listService, removeService} = require('../Controller/ServiceController');

const serviceRouter = express.Router();

//Image storage

const storage = multer.diskStorage({
    
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

serviceRouter.post("/add",upload.single("image"),addService);
serviceRouter.get("/list",listService)
serviceRouter.post("/remove",removeService)


module.exports = serviceRouter;

