const express = require('express');
const path = require('path');
const multer = require('multer');
const { menderDataRegister, menderDataGet, menderDataEdit, validateMenderData, menderDataActive, menderDataInactive, menderLogout, menderLogin, menderSearch } = require('../Controller/MenderController');
const {verifyToken} = require('../Middleware/Auth')

const menderRouter = express.Router();

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     let folder = '';
    //     if (file.fieldname === 'aadhaar') {
    //         folder = './Public/Aadhaar';
    //     } else if (file.fieldname === 'pancard') {
    //         folder = './Public/Pancard';
    //     } else if (file.fieldname === 'bank') {
    //         folder = './Public/BankDetails';
    //     }
    //     cb(null, folder);
    // },
    destination: (req, file, cb) => {
        cb(null, './Public/MenderData');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')   ||file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

function multerErrorHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ success: false, message: "File limit exceeds 5MB" });
        }
        return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
    next();
}

menderRouter.post('/register', upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'aadhaar', maxCount: 1 },
    { name: 'pancard', maxCount: 1 },
    { name: 'bank', maxCount: 1 }
]), multerErrorHandler, menderDataRegister);
menderRouter.post('/validate',validateMenderData)
menderRouter.get('/listmender', menderDataGet);
menderRouter.put('/editmender/:id', upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'aadhaar', maxCount: 1 },
    { name: 'pancard', maxCount: 1 },
    { name: 'bank', maxCount: 1 }
]), multerErrorHandler, menderDataEdit);
menderRouter.post('/inactivemender/:id', menderDataInactive);
menderRouter.post('/activemender/:id',menderDataActive);
menderRouter.post('/logoutmender/:id',menderLogout);
menderRouter.post('/loginmender/:id',menderLogin);
menderRouter.get('/search',menderSearch);

module.exports = menderRouter;