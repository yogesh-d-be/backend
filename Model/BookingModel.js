const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:true
        // type: mongoose.Schema.Types.ObjectId, required: true 
       
    },
    bookings:{
        type:Array,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    bookingDate:{
        type:String,
       required:true
    },
    bookingTime:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"TuneGuru Mender Searching"
    },
    date:{
        type:Date,
        default:Date.now
    },
    payment:{
        type:Boolean,
        default:false
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card'],
        default: 'card'
    },
    // repairPic: {
    //     type: [String], // Array of strings 
    //     required: true,
    //     validate: {
    //         validator: function (array) {
    //             return array.length <= 3; // Limit to 3 images
    //         },
    //         message: 'Cannot upload more than 3 images'
    //     }
    // }
    repairVideo:{
        type:String
    }

})

const bookingModel = mongoose.models.bookings || mongoose.model("bookings",bookingSchema)

module.exports = bookingModel;
