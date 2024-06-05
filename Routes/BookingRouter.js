const express = require('express');
const {verifyToken} = require('../Middleware/Auth');

const {placeBooking,verifyOrder} = require('../Controller/BookingController');

const bookingRouter = express.Router();

bookingRouter.post("/place",verifyToken,placeBooking);
bookingRouter.post("/verify",verifyOrder)

module.exports = bookingRouter;