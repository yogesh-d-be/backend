// const bookingModel = require('../Model/BookingModel');
// const userDB = require('../Model/LoginUserModel');
// const Stripe = require('stripe');

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const placeBooking = async (req, res) => {
//     const frontend_url = process.env.NODE_ENV === 'production'
//         ? "https://master--tuneguru.netlify.app/"
//         : "http://localhost:3000";

//     try {
//         console.log('Request Body:', req.body); // Log the request body
//         const userId = req.userId;

//         // Create a new booking
//         const newBooking = new bookingModel({
//             userId: userId,
//             bookings: req.body.bookings,
//             amount: req.body.amount,
//             address: req.body.address,
//             bookingDate: req.body.bookingDate,
//             bookingTime: req.body.bookingTime
//         });

//         // Save the new booking to the database
//         await newBooking.save();

//         // Format the line items for Stripe
//         const line_items = req.body.bookings.map((booking) => ({
//             price_data: {
//                 currency: "inr",
//                 product_data: {
//                     name: booking.serviceName,
//                 },
//                 unit_amount: Math.round(booking.price * 100), // Stripe expects amounts in cents/paise
//             },
//             quantity: booking.quantity,
//         }));

//         const totalBookingAmount = req.body.bookings.reduce((total, booking) => total + booking.price * booking.quantity, 0);
//         // Add a booking charge line item
//         line_items.push({
//             price_data: {
//                 currency: "inr",
//                 product_data: {
//                     name: "GST Charges",
//                 },
//                 unit_amount: Math.round(totalBookingAmount * 100 * 0.08), // Example booking charge of 8%
//             },
//             quantity: 1,
//         });

//         // Create a Stripe checkout session
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: line_items,
//             mode: 'payment',
//             success_url: `${frontend_url}/verify?success=true&bookingId=${newBooking._id}`,
//             cancel_url: `${frontend_url}/verify?success=false&bookingId=${newBooking._id}`,
//         });

//         // Send the session URL to the frontend
//         res.status(200).json({ success: true, session_url: session.url });
//     } catch (error) {
//         console.error('Error placing booking:', error);
//         res.status(400).json({ success: false, message: "Error placing booking", error: error.message });
//     }
// };

// const verifyOrder = async (req, res) => {
//     const { bookingId, success } = req.body;
//     try {
//         if (success === "true") {
//             await bookingModel.findByIdAndUpdate(bookingId, { payment: true });
//             console.log(cartData)
//             // Clear the user's cart data
//             await userDB.findOneAndUpdate({ userID: req.userId }, { cartData: {} });
//             console.log(userID)
//             res.json({ success: true, message: "Paid" });
//         } else {
//             await bookingModel.findByIdAndDelete(bookingId);
//             res.json({ success: false, message: "Not Paid" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: "Error verifying order" });
//     }
// };

// const userBookings = async (req, res) => {
//     try {
//         const bookings = await bookingModel.find({ userId: req.userId });
//         res.json({ success: true, data: bookings });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error fetching bookings" });
//     }
// };

// module.exports = { placeBooking, verifyOrder, userBookings };


const bookingModel = require('../Model/BookingModel');
const userDB = require('../Model/LoginUserModel');
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeBooking = async (req, res) => {
    // const frontend_url = process.env.NODE_ENV ==='development' ? "http://localhost:3000" : "https://tuneguru.netlify.app";
    const frontend_url =  "https://tuneguru.netlify.app" ;
    // const frontend_url =  "http://localhost:3000" ;

    try {
        console.log('Request Body:', req.body); 
        const userId = req.userId;

        const newBooking = new bookingModel({
            userId: userId,
            bookings: req.body.bookings,
            amount: req.body.amount,
            address: req.body.address,
            bookingDate: req.body.bookingDate,
            bookingTime: req.body.bookingTime
        });

        await newBooking.save();
        
        // Clear user's cart data
        await userDB.findOneAndUpdate(
            { userID: userId },
            { cartData: {} },
            { new: true }
        );

        const line_items = req.body.bookings.map((booking) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: booking.serviceName,
                },
                unit_amount: Math.round(booking.price * 100), 
            },
            quantity: booking.quantity,
        }));

        const totalBookingAmount = req.body.bookings.reduce((total, booking) => total + booking.price * booking.quantity, 0);
    
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
            success_url: `${frontend_url}/verify?success=true&bookingId=${newBooking._id}`,
            cancel_url: `${frontend_url}/verify?success=false&bookingId=${newBooking._id}`,
        });

        res.status(200).json({ success: true, session_url: session.url });
    } 
    catch (error) {
        console.error('Error placing booking:', error);
        await bookingModel.findByIdAndDelete(bookingId);
        res.status(400).json({ success: false, message: "Error placing booking", error: error.message });
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

module.exports = { placeBooking, verifyBookings, userBookings,listBookings,updateStatus };
