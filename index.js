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
const contactRouter = require('./Routes/ContactRouter');
const menderRouter = require('./Routes/MenderRouter');
const jsonParser = bodyParser.json();
app.use(cors());
app.use(jsonParser);

// Connect to the database
connect();

// Define routes
app.use(router);
//api endpoints
app.use("/api/homeservice",serviceRouter);
app.use("/api/cart",cartRouter)
app.use("/api/book",bookingRouter)
app.use("/api/contact",contactRouter)
app.use("/images",express.static('uploads'))
app.use("/images",express.static('Public/userFile'))
app.use("/video/RepairVideo", express.static("Public/RepairVideo"))
app.use("/images/contactform", express.static("Public/ContactFile"))
app.use('/api/mender',menderRouter);
// app.use('mender/aadhaar',express.static("Public/Aadhaar"))
// app.use('mender/pancard',express.static("Public/Pancard"))
// app.use('mender/bankdetails',express.static("Public/BankDetails"))
app.use('/files/menderdata', express.static('Public/MenderData'));
//Cors config
app.use(cors({
    origin: 'https://tuneguru.netlify.app', //  frontend URL
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

// app.use(useRouter);
// app.use('/customer/user', router); // Use userRoutes for user-related routes
// app.use('/Twilio-Route', twilioRouter); // Uncomment if you want to use Twilio routes

const { PORT } = process.env;
const port = PORT || 5000; // Use port 5000 if PORT environment variable is not set

app.listen(port, () => {
    console.log("Server is running:", port);
});
