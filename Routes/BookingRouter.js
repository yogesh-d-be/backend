const express = require('express');
const {verifyToken} = require('../Middleware/Auth');

const {placeBooking,verifyOrder, userBookings, listBookings} = require('../Controller/BookingController');

const bookingRouter = express.Router();

bookingRouter.post("/place",verifyToken,placeBooking);
bookingRouter.post("/verify",verifyToken,verifyOrder);
bookingRouter.post("/userbookings",verifyToken,userBookings);
bookingRouter.get('/listbookings',listBookings)

module.exports = bookingRouter;