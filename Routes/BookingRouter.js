const express = require('express');
const {verifyToken} = require('../Middleware/Auth');

const {placeBooking,verifyOrder, userBookings} = require('../Controller/BookingController');

const bookingRouter = express.Router();

bookingRouter.post("/place",verifyToken,placeBooking);
bookingRouter.post("/verify",verifyOrder)
bookingRouter.post("/userbookings",verifyToken,userBookings)

module.exports = bookingRouter;