const express = require('express');
const multer = require("multer");

const router = express.Router();
const {
  LoginUserDataPost,
  userLogin,
  LoginUserDataGet,
  LoginUserDataEdit,
  LoginUserDataDelete,
  uploadUserProfilePic,
  
  userProfilePicDelete,

  
} = require('../Controller/LoginUserController');
const { userOtpSend } = require('../Utility/MailUtility');
const { verifyToken } = require('../Middleware/Auth');

const storage = multer.diskStorage({
  destination: "./Public/userFile",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.post('/customer/register',LoginUserDataPost);
router.post('/customer/sendotp', userOtpSend);
router.post('/customer/login', userLogin);
router.get('/customer/get', verifyToken, LoginUserDataGet);
router.put('/customer/put', verifyToken,  LoginUserDataEdit);
router.delete('/customer/delete', verifyToken, LoginUserDataDelete);
// router.delete('/customer/delete-profile-pic', verifyToken, userProfilePicDelete);
router.post('/customer/upload-profile-pic', verifyToken, upload.single("userPic"), uploadUserProfilePic);
router.post('/customer/delete-profile-pic', verifyToken, userProfilePicDelete);


module.exports = router;
