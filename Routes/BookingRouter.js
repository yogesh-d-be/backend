const express = require('express');
const {verifyToken} = require('../Middleware/Auth');

const {placeBooking, userBookings, listBookings, verifyBookings} = require('../Controller/BookingController');

const bookingRouter = express.Router();

bookingRouter.post("/place",verifyToken,placeBooking);
bookingRouter.post("/verify",verifyToken,verifyBookings);
bookingRouter.post("/userbookings",verifyToken,userBookings);
bookingRouter.get('/listbookings',listBookings)

module.exports = bookingRouter;