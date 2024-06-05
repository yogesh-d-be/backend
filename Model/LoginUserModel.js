const mongoose = require('mongoose');
const validator = require('validator');
const { v4 } = require('uuid');

const userData = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: 'Not a valid email'
        }
    },
    mobilenumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isLength(value, { min: 10, max: 10 });
            },
            message: 'Mobile number must be exactly 10 digits'
        }
    },
    address: {
        type: String,
        required: true
    },
    // _id: mongoose.Schema.Types.ObjectId,
    userID: {
        type: String,
        default: v4
    },
    userPic:{
        type:String,
    },
    cartData:{
        type:Object,
        default:{}
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
},{minimize:false});

const userDB = mongoose.models.user || mongoose.model("loginusers", userData);

module.exports = userDB;


// user.methods.generateAuthToken = async function(){
//     try {
//         let newToken = jwt.sign({_id:this._id},SECRET_KEY,{expiresIn:"1d"});

//         this.tokens =  this.tokens.concat({token:newToken});
//         await this.save();
//         return newToken;

//     } 
//     catch (error) {
//         // Do not handle errors here
//         throw error;
//     }
// }


