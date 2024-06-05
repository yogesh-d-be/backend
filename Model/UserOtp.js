const mongoose = require('mongoose');
const validator = require('validator'); // Import the validator module

const userOtpModel = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value); // Use the validator method here
            },
            message: 'Not a valid email'
        }
    },
    
    otp: {
        type: String,
        required: true,
    }
});

const userOtp = mongoose.model("userOtps", userOtpModel);

module.exports = userOtp;
