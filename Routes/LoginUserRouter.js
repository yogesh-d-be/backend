const express = require('express');
const multer = require("multer");

const router = express.Router();
const {
  LoginUserDataPost,
  userLogin,
  LoginUserDataGet,
  LoginUserDataEdit,
  LoginUserDataDelete,
  UserProfilePicDelete,
  uploadUserProfilePic,
  
} = require('../Controller/LoginUserController');
const { userOtpSend } = require('../Utility/MailUtility');
const { verifyToken } = require('../Middleware/Auth');

const storage = multer.diskStorage({
  destination: "./userFile",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.post('/customer/register',LoginUserDataPost);
router.post('/customer/sendotp', userOtpSend);
router.post('/customer/login', userLogin);
router.get('/customer/get', verifyToken, LoginUserDataGet);
router.put('/customer/put', verifyToken,  LoginUserDataEdit);
router.delete('/customer/delete', verifyToken, LoginUserDataDelete);
// router.delete('/customer/delete-profile-pic', verifyToken, UserProfilePicDelete);
// router.post('/customer/upload-profile-pic', verifyToken, upload.single("userPic"), uploadUserProfilePic);

module.exports = router;
