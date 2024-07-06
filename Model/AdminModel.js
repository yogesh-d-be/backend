// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const adminSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   }
// });

// // Hash password before saving
// adminSchema.pre('save', async function (next) {
//   if (this.isModified('password') || this.isNew) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// const Admin = mongoose.model('Admin', adminSchema);

// module.exports = Admin;
