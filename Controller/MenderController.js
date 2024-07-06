const menderDB = require('../Model/MenderModel');
const fs = require('fs')
const path = require('path');
const menderDataRegister = async (req, res) => {
    try {
        const { name, mobileNumber, emailId, currentAddress, expertise, experience } = req.body;

        // const existingUser = await menderDB.findOne({ mobileNumber });

        // if (existingUser) {
        //     return res.status(409).json({ error: "This mender already exists" });
        // }

        // Ensure req.files and respective file properties exist before accessing them
        const aadhaarFile = req.files && req.files['aadhaar'] ? req.files['aadhaar'][0].filename : null;
        const pancardFile = req.files && req.files['pancard'] ? req.files['pancard'][0].filename : null;
        const bankFile = req.files && req.files['bank'] ? req.files['bank'][0].filename : null;

        // if (!aadhaarFile || !pancardFile || !bankFile) {
        //     return res.status(400).json({ message: 'All files (aadhaar, pancard, and bank) are required.' });
        // }

        // Create a new instance of menderDB
        const newMenderData = new menderDB({
            name,
            mobileNumber,
            emailId,
            aadhaar: aadhaarFile,
            pancard: pancardFile,
            bank: bankFile,
            currentAddress,
            expertise,
            experience,
            status: 'active'
        });

        // Validate and save to database
        await newMenderData.save();

        res.status(200).json({ message: "Congratulations! You've successfully registered with the TuneGuru family!" });
    } catch (error) {
        console.error('Error uploading data and files:', error);
        res.status(500).json({ message: 'Error uploading data and files', error: error.message });
    }
};

const validateMenderData = async (req, res) => {
    try {
        const { mobileNumber, emailId } = req.body;

        const existingUser = await menderDB.findOne({ $or: [{ mobileNumber }, { emailId }] });

        if (existingUser) {
            return res.status(409).json({ message: "This mender already exists" });
        }

        res.status(200).json({ message: "Validation successful" });
    } catch (error) {
        console.error('Error validating data:', error);
        res.status(500).json({ message: 'Error validating data', error: error.message });
    }
};






const menderDataGet = async(req,res)=>{
    try {
        const mender = await menderDB.find({});
        res.status(200).json({success:true, data:mender });

    } catch (error) {
        res.status(400).json({success:false, message:"Error",error})
    }
}

const menderDataEdit = async (req, res) => {
    try {
        const { id } = req.params;

        const updates = {
            name: req.body.name,
            mobileNumber: req.body.mobileNumber,
            emailId: req.body.emailId,
            currentAddress: req.body.currentAddress,
            expertise: req.body.expertise.split(','), // Assuming expertise is a comma-separated string
            experience: req.body.experience
        };

        let existingMenderData = await menderDB.findById(id);

        if (!existingMenderData) {
            return res.status(404).json({
                success: false,
                message: "Mender Not Found"
            });
        }

        // Delete existing files if new files are uploaded
        if (req.files) {
            if (req.files['aadhaar']) {
                deleteFile(existingMenderData.aadhaar);
                updates.aadhaar = req.files['aadhaar'][0].filename;
            }
            if (req.files['pancard']) {
                deleteFile(existingMenderData.pancard);
                updates.pancard = req.files['pancard'][0].filename;
            }
            if (req.files['bank']) {
                deleteFile(existingMenderData.bank);
                updates.bank = req.files['bank'][0].filename;
            }
        }

        existingMenderData = await menderDB.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({
            success: true,
            message: "Mender Data updated successfully"
        });
    } catch (error) {
        console.error('Error updating menderData:', error);
        res.status(500).json({ success: false, message: 'Error updating menderData', error: error.message });
    }
};

const deleteFile = async (filePath) => {
    try {
        if (filePath) {
            
            fs.unlinkSync(`Public/MenderData/${filePath}`);
            console.log(`Deleted file: ${filePath}`);
        } else {
            console.log('File path is empty or undefined.');
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`File not found: ${filePath}`);
        } else {
            console.error(`Error deleting file ${filePath}:`, error);
            throw error;
        }
    }
};
const menderDataDelete = async(req,res)=>{
    try{
        const {id} = req.params;

        const existingMenderData = await menderDB.findById(id);
        if (!existingMenderData) {
            return res.status(404).json({ success: false, message: 'MenderData not found' });
        }

        // Delete files
        // deleteFile(existingMenderData.aadhaar);
        // deleteFile(existingMenderData.pancard);
        // deleteFile(existingMenderData.bank);

        existingMenderData.status = 'inactive';
        await existingMenderData.save();

        res.status(200).json({ success: true, message: 'MenderData deleted successfully', data: existingMenderData });
    } catch (error) {
        console.error('Error deleting menderData:', error);
        res.status(500).json({ success: false, message: 'Error deleting menderData', error: error.message });
    }

}


module.exports = {
    menderDataRegister,
    validateMenderData,
    menderDataGet,
    menderDataEdit,
    menderDataDelete
};
