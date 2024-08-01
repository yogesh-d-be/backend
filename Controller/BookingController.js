const bookingModel = require('../Model/BookingModel');
const userDB = require('../Model/LoginUserModel');
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeBooking = async (req, res) => {
    // const frontend_url = process.env.NODE_ENV ==='development' ? "http://localhost:3000" : "https://tuneguru.netlify.app";
    const frontend_url =  "https://tuneguru.netlify.app";
    // const frontend_url =  "http://localhost:3000" ;
    let bookingId = null
    try {
        
        const userId = req.userId;

        let bookings = req.body.bookings;
        if(typeof bookings === 'string'){
            bookings = JSON.parse(bookings); //convert string to array
            //because of file request sometimes aaray become string
        }

        if(!Array.isArray(bookings)){
            throw new Error('bookings must be an array')
        }

        const newBooking = new bookingModel({
            userId: userId,
            bookings: bookings,
            amount: req.body.amount,
            address: JSON.parse(req.body.address),
            bookingDate: req.body.bookingDate,
            bookingTime: req.body.bookingTime,
            repairVideo: req.file ? req.file.filename : null,
            paymentMethod: req.body.paymentMethod
            // payment:false//initialise
        });

        await newBooking.save();
        bookingId = newBooking._id;
        // Clear user's cart data
        await userDB.findOneAndUpdate(
            { userID: userId },
            { cartData: {} },
            { new: true }
        );

        if(req.body.paymentMethod === "cash"){
            await bookingModel.findByIdAndUpdate(bookingId,{payment:true});
            return res.status(200).json({success:true, message:"Booking placed"})
        }

        const line_items = bookings.map((booking) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: booking.serviceName,
                },
                unit_amount: Math.round(booking.price * 100), 
            },
            quantity: booking.quantity,
        }));

        const totalBookingAmount = bookings.reduce((total, booking) => total + booking.price * booking.quantity, 0);
    
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "GST Charges",
                },
                unit_amount: Math.round(totalBookingAmount * 100 * 0.08),
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&bookingId=${bookingId}`,
            cancel_url: `${frontend_url}/verify?success=false&bookingId=${bookingId}`,
        });

        res.status(200).json({ success: true, session_url: session.url });
    } 
    catch (error) {
        console.error('Error placing booking:', error);
        if(bookingId){
            await bookingModel.findByIdAndDelete(bookingId);
        }
        
        res.status(400).json({ success: false, message: "Error placing booking, Check book details are filled..!", error: error.message });
    }
};

const verifyBookings = async (req, res) => {
    const { bookingId, success } = req.body;
    

    try {
        if (success === "true") {
            await bookingModel.findByIdAndUpdate(bookingId, { payment: true });

            console.log(`Clearing cart data for user: ${req.userId}`); 

            
            await userDB.findOneAndUpdate(
                { userID: req.userId },
                { cartData: {} },
                { new: true }
            );

            res.json({ success: true, message: "Paid" });
        } else {
            await bookingModel.findByIdAndDelete(bookingId);
            res.json({ success: false, message: "Not Paid" });
        }
    } 
    catch (error) {
        console.error('Error verifying order:', error);
        res.json({ success: false, message: "Error verifying order", details: error.message });
    }
};

const userBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find({ userId: req.userId });
        res.json({ success: true, data: bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.json({ success: false, message: "Error fetching bookings" });
    }
};

//list the bookings in admin panel
const listBookings = async(req,res) =>{
    try {

        const bookings = await bookingModel.find({});
        res.json({success:true, data:bookings})
        
    } catch (error) {
        res.json({success:false, message:"error",error})
    }
}

const updateStatus = async(req,res)=>{
    try {
        const bookingId=req.body.bookingId
        const status=req.body.status
        // console.log("book",bookingId)
        await bookingModel.findByIdAndUpdate(bookingId, {status:status});
        // console.log("status",status)
        res.json({success:true,message:"Status updated"})
    } 
    catch (error) {
        res.json({success:false, message:"Error"})
    }
}

const cancelBooking = async(req,res)=>{
    try{
    const {bookingId} = req.body;
    const status=req.body.status

    await bookingModel.findByIdAndUpdate( bookingId, {status:"Cancel"});

    res.json({success:true, message: "Booking cancelled"})
}
catch(error){
    res.json({success:false, message:error.message})
}
}

const assignMender = async(req,res) =>{

    try{
    const {bookingId, mender} = req.body;

    if(!bookingId, mender){
        return res.status(400).json({success:false, message: "Booking ID and Mender not found"})
    }

    const booking = await bookingModel.findById(bookingId);

    if(!booking){
        return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    booking.mender.push(mender);
    await booking.save();

    return res.status(200).json({success:true, message: "Mender assigned successfully"});
    }
    catch (error) {
        console.error('Error assigning mender to booking:', error);
        return res.status(500).json({ success: false, message: 'Error assigning mender to booking', error: error.message });
      }

}

module.exports = { placeBooking, verifyBookings, userBookings,listBookings,updateStatus, cancelBooking, assignMender };
