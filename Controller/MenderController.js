const menderDB = require('../Model/MenderModel');
const fs = require('fs')
const path = require('path');
const menderDataRegister = async (req, res) => {
    try {
        const { name, mobileNumber, emailId, currentAddress, expertise='', experience } = req.body;

        // const existingUser = await menderDB.findOne({ mobileNumber });

        // if (existingUser) {
        //     return res.status(409).json({ error: "This mender already exists" });
        // }
        
        // Ensure req.files and respective file properties exist before accessing them
        const profilePictureFile = req.files && req.files['profilePicture'] ? req.files['profilePicture'][0].filename : null;
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
            profilePicture: profilePictureFile,
            aadhaar: aadhaarFile,
            pancard: pancardFile,
            bank: bankFile,
            currentAddress,
            expertise:expertise.split(','),
            experience,
            status: 'login',
            accountStatus:'active'
        });
       
        // Validate and save to database
        await newMenderData.save();

        return res.status(200).json({ message: "Congratulations! You've successfully registered with the TuneGuru family!" });
    } catch (error) {
        console.error('Error uploading data and files:', error);
        return res.status(500).json({ message: 'Error uploading data and files', error: error.message });
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
        return res.status(200).json({success:true, data:mender });

    } catch (error) {
        return res.status(400).json({success:false, message:"Error",error})
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
            experience: req.body.experience,
            status: req.body.status
        };

        let existingMenderData = await menderDB.findById(id);

        if (!existingMenderData) {
            return res.status(404).json({ success: false, message: "Mender Not Found" });
        }

        if (req.files) {
            ["profilePicture", "aadhaar", "pancard", "bank"].forEach(field => {
                if (req.files[field]) {
                    deleteFile(existingMenderData[field]);
                    updates[field] = req.files[field][0].filename;
                }
            });
        }

        existingMenderData = await menderDB.findByIdAndUpdate(id, updates, { new: true });
        return res.status(200).json({ success: true, message: "Mender Data updated successfully" });
    } catch (error) {
        console.error('Error updating menderData:', error);
        return res.status(500).json({ success: false, message: 'Error updating menderData', error: error.message });
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
const menderDataInactive = async(req,res)=>{
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

        existingMenderData.accountStatus = 'inactive';
        existingMenderData.status = 'remove';
        await existingMenderData.save();

        return res.status(200).json({ success: true, message: 'MenderData inactive successfully', data: existingMenderData });
    } catch (error) {
        console.error('Error inactive menderData:', error);
       return res.status(500).json({ success: false, message: 'Error inactive menderData', error: error.message });
    }

}

const menderDataActive = async(req,res) =>{
    try {
        const {id} = req.params;
        const existingMenderData = await menderDB.findById(id);
        if (!existingMenderData) {
            return res.status(404).json({ success: false, message: 'MenderData not found' });
        }

        existingMenderData.accountStatus = 'active';
        existingMenderData.status = 'login';
        
        await existingMenderData.save();

        return res.status(200).json({ success: true, message: 'MenderData active successfully', data: existingMenderData });
    } catch (error) {
        console.error('Error during active menderData:', error);
       return res.status(500).json({ success: false, message: 'Error during active menderData', error: error.message });
    } 

  
}
const menderLogout = async(req,res)=>{
    try{
        const {id} = req.params;

        const existingMenderData = await menderDB.findById(id);
        if (!existingMenderData) {
            return res.status(404).json({ success: false, message: 'MenderData not found' });
        }


        existingMenderData.status = 'logout';
        await existingMenderData.save();

        return res.status(200).json({ success: true, message: 'Mender logout successfully', data: existingMenderData });
    } catch (error) {
        console.error('Error logout mender:', error);
       return res.status(500).json({ success: false, message: 'Error logout mender', error: error.message });
    }

}

const menderLogin = async(req,res) =>{
    try {
        const {id} = req.params;
        const existingMenderData = await menderDB.findById(id);
        if (!existingMenderData) {
            return res.status(404).json({ success: false, message: 'MenderData not found' });
        }

        existingMenderData.status = 'login';
        await existingMenderData.save();

        return res.status(200).json({ success: true, message: 'Mender login successfully', data: existingMenderData });
    } catch (error) {
        console.error('Error during login mender:', error);
       return res.status(500).json({ success: false, message: 'Error during login mender', error: error.message });
    } 

  
}

const menderSearch = async(req,res) =>{
    try {
        const { expertise } = req.query;

        // Validate expertise parameter
        if (!expertise) {
            return res.status(400).json({ success: false, message: 'Expertise parameter is required.' });
        }

        // Find menders with the given expertise
        const menders = await menderDB.find({ expertise: { $in: expertise.split(',') } });

        if (menders.length === 0) {
            return res.status(404).json({ success: false, message: 'No menders found with the given expertise.' });
        }

        // Respond with mender names and expertise
        res.status(200).json({ success: true, data: menders });
    } catch (error) {
        console.error('Error searching for menders:', error);
        res.status(500).json({ success: false, message: 'Error searching for menders', error: error.message });
    }
}


module.exports = {
    menderDataRegister,
    validateMenderData,
    menderDataGet,
    menderDataEdit,
    menderDataInactive,
    menderDataActive,
    menderLogout,
    menderLogin,
    menderSearch
};
