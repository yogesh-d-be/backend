const userContact = require('../Model/ContactModel');
const nodeMailer = require('nodemailer');

const createContactUserData = async(req,res) =>{
    try{
        const {name,emailId,mobileNumber,message} = req.body;
        const file =req.file ? req.file.filename: null;
        const contactUserData = new userContact({name,emailId,mobileNumber,message, contactFile:file});
        await contactUserData.save();
        await sendMailToUser( name, emailId, mobileNumber, message,file)
        res.status(200).json({success:true, message: "Email sent successfully" });
    } catch (error) {
        res.status(400).json({ success:false, message: "Failed to save contact data or send email", details: error.message });
    }
    
}

const contactUserDataGet = async(req,res) =>{
    try {
      const contact = await userContact.find({});
      return res.status(200).json({success:true, data:contact})  
    } 
    catch (error) {
        return res.status(400).json({success:false, message:"Error",error})
    }
}

const sendMailToUser = async ( name, emailId, mobileNumber, message, file) =>{
    try{
        const transporter = nodeMailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        });

        const mailOption = {
            from:process.env.EMAIL,
            to:process.env.TOEMAIL,
            // replyTo: req.user.email,
            subject: "Contact Form Submission",
            html: `
        <h1>Contact Form Submission</h1>
        <p>Name: ${name}</p>
        <p>Email: ${emailId}</p>
        <p>Mobile Number: ${mobileNumber}</p>
        <p>Message: ${message}</p>`,
        
            attachments: [
                {
                    filename: file,
                    path: `./Public/ContactFile/${file}`
                }
            ]
        };

        await transporter.sendMail(mailOption);
    }
    catch(error){
        console.error("Error in sending email:", error);
    }
}

module.exports = 
{createContactUserData,
    contactUserDataGet
}