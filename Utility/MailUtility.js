// const nodemailer = require('nodemailer');
// const userDB = require('../Model/LoginUserModel');
// const userOtp = require('../Model/UserOtp')

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// });

// const userOtpSend = async (req, res)  => {
//     const { email, username } = req.body;

//     if (!email || !username) {
//         return res.status(400).json({ error: "Please provide email and username" });
//     }

//     try {
//         const preuser = await userDB.findOne({ email });

//         if (preuser) {
//             const OTP = Math.floor(100000 + Math.random() * 900000);
//             const existEmail = await userOtp.findOne({ email });//already sign up user

//             if (existEmail) {
//                 // Update existing userOtp document //already sign up user
//                 const updateData = await userOtp.findByIdAndUpdate(existEmail._id, { otp: OTP }, { new: true });
//                 await updateData.save();
//             } else {
//                 // Create new userOtp document
//                 const saveOtpData = new userOtp({ username, email, otp: OTP });
//                 await saveOtpData.save();
//             }

//             // Send email
//             const mailOptions = {
//                 from: process.env.EMAIL,
//                 to: email,
//                 subject: "TUNEGURU Verification Code",
//                 text: `Hello ${username},\n Kindly use the below mentioned OTP to verify:\n\n OTP:${OTP}  \n\nPlease do not share OTP with anyone`
//             };

//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     console.log("error", error);
//                     return res.status(400).json({ error: "Email not sent" });
//                 } else {
//                     console.log("Email sent", info.response);
//                     return res.status(200).json({ message: "Email sent successfully" });
//                 }
//             });
//         } else {
//             return res.status(400).json({ error: "You are not registered" });
//         }
//     } catch (error) {
//         return res.status(400).json({ error: "Invalid details", details: error.message });
//     }
// };


// module.exports = {
//     userOtpSend,
// }

const nodemailer = require('nodemailer');
const userDB = require('../Model/LoginUserModel');
const userOtp = require('../Model/UserOtp');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const userOtpSend = async (req, res)  => {
    const { email, username } = req.body;

    if (!email || !username) {
        return res.status(400).json({ error: "Please provide email and username" });
    }

    try {
        const preuser = await userDB.findOne({ email });

        if (preuser) {
            const OTP = Math.floor(100000 + Math.random() * 900000);
            let existEmail = await userOtp.findOne({ email });

            if (existEmail) {
                // Update existing userOtp document if user already exists
                existEmail.otp = OTP;
                await existEmail.save();
            } else {
                // Create new userOtp document if user is new
                existEmail = new userOtp({ username, email, otp: OTP });
                await existEmail.save();
            }

            // Send email
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "TUNEGURU Verification Code",
                text: `Hello ${username},\n Kindly use the below mentioned OTP to verify:\n\n OTP:${OTP}  \n\nPlease do not share OTP with anyone`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error sending email:", error);
                    return res.status(400).json({ error: "Email not sent" });
                } else {
                    console.log("Email sent successfully:", info.response);
                    return res.status(200).json({ message: "Email sent successfully" });
                }
            });
        } else {
            return res.status(400).json({ error: "You are not registered" });
        }
    } catch (error) {
        return res.status(400).json({ error: "Invalid details", details: error.message });
    }
};

module.exports = {
    userOtpSend,
};
