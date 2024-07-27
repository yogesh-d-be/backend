const mongoose = require('mongoose');

const stringRequired = {
    type: String,
    required: true
};

const numberRequired = {
    type: Number,
    required: true
};

const menderData = new mongoose.Schema({
   
    name: stringRequired,
    mobileNumber: {...numberRequired,unique:true},
    emailId: {...stringRequired,unique:true},
    profilePicture:stringRequired,
    aadhaar: stringRequired,
    pancard: stringRequired, // Updated field name to match controller
    bank: stringRequired,
    currentAddress: stringRequired,
    expertise: {
        type: [String],
        required: true
    },
    experience: stringRequired,
    accountStatus:{
        type:String,
        enum:['active','inactive']
    },
    status:{
        type: String,
        enum:['login','logout','remove'],
    },
    workStatus:{
        type: String,
        enum:['assigned','notAssign'],
        default: null
    },
    date:{
        type:Date,
        default:Date.now
    },
});

const menderDB = mongoose.model('MenderData', menderData);
module.exports = menderDB;
