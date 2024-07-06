// const bcrypt = require('bcrypt');
// const Admin = require('../Model/AdminModel');
// const { adminTokenGenerate } = require('../Utility/AdminAuth');

// const adminLogin = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Check if admin exists
//     let admin = await Admin.findOne({ username });

//     // If admin does not exist, create it with predefined credentials
//     if (!admin) {
//       if (username === predefinedAdmin.username && password === predefinedAdmin.password) {
//         const newAdmin = new Admin(predefinedAdmin);
//         await newAdmin.save();
//         admin = newAdmin;
//       } else {
//         return res.status(400).json({ success: false, message: 'Invalid credentials' });
//       }
//     }

//     // Verify password
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: 'Invalid credentials' });
//     }

//     // Generate token
//     const token = await adminTokenGenerate(admin._id);

//     res.status(200).json({ success: true, token });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// module.exports = {
//   adminLogin
// };
