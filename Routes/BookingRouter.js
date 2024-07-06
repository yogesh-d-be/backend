const express = require('express');
const multer = require('multer');
const path = require('path')
const {verifyToken} = require('../Middleware/Auth');

const {placeBooking, userBookings, listBookings, verifyBookings, updateStatus, cancelBooking} = require('../Controller/BookingController');

const bookingRouter = express.Router();

const storage = multer.diskStorage({
    destination:"./Public/RepairVideo",
    filename:(req, file, cb) =>{
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
});

//file filter to allow only videos

const fileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('video/')){
        cb(null,true)
    }
    else{
        cb(new Error('Only videos are accepted'), false)
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits:{
        fileSize: 1024 * 1024 * 100 // 100mb
    }
})

function multerErrorHandler(err, req, res, next) {
    if(err instanceof multer.MulterError){
        // A Multer error occurred when uploading.
        if(err.code === 'LIMIT_FILE_SIZE'){
            return res.status(400).json({ success:false, message:"File size exceeds the limit of 100MB"})
        }
        return res.status(400).json({success:false, message: err.message})
    }
    else if (err) {
        // An unknown error occurred when uploading.
        return res.status(400).json({ success: false, message: err.message });
    }
    // If no error, proceed to the next middleware/route handler
    next();
}

bookingRouter.post("/place",verifyToken,upload.single('repairVideo'),multerErrorHandler,placeBooking);
bookingRouter.post("/verify",verifyToken,verifyBookings);
bookingRouter.post("/userbookings",verifyToken,userBookings);
bookingRouter.get('/listbookings',listBookings)
bookingRouter.post('/status',updateStatus)
bookingRouter.post('/cancel',cancelBooking)


module.exports = bookingRouter;