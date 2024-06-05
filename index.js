require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./Common/DbConnection');
const router = require('./Routes/LoginUserRouter');

// const useRouter = require('./Routes/ServiceRoute')
// const userRoutes = require('./Routes/LoginUserRouter'); // Import userRoutes


const app = express();
const cors = require('cors');
const serviceRouter = require('./Routes/ServiceRouter');
const cartRouter = require('./Routes/CartRouter');
const bookingRouter = require('./Routes/BookingRouter');
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(cors());

// Connect to the database
connect();

// Define routes
app.use(router);
//api endpoints
app.use("/api/homeservice",serviceRouter);
app.use("/api/cart",cartRouter)
app.use("/api/book",bookingRouter)
app.use("/images",express.static('uploads'))

// app.use(useRouter);
// app.use('/customer/user', router); // Use userRoutes for user-related routes
// app.use('/Twilio-Route', twilioRouter); // Uncomment if you want to use Twilio routes

const { PORT } = process.env;
const port = PORT || 5000; // Use port 5000 if PORT environment variable is not set

app.listen(port, () => {
    console.log("Server is running:", port);
});
