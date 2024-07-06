const mongoose = require('mongoose');

const stringRequired = {
    type: String,
    required: true
};

const numberRequired = {
    type: Number,
    required: true
};

const menderDataSchema = new mongoose.Schema({
    name: stringRequired,
    mobileNumber: {...numberRequired,unique:true},
    emailId: {...stringRequired,unique:true},
    aadhaar: stringRequired,
    pancard: stringRequired, // Updated field name to match controller
    bank: stringRequired,
    currentAddress: stringRequired,
    expertise: {
        type: [String],
        required: true
    },
    experience: stringRequired,
    status:{
        type: String,
        enum:['active','inactive'],
        default: null
    },
    workStatus:{
        type: String,
        enum:['assigned','notAssign'],
        default: null
    }
});

module.exports = mongoose.model('MenderData', menderDataSchema);
