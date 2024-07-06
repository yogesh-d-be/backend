// const jwt =  require('jsonwebtoken');
// const menderDB = require('../Model/MenderModel');

// const adminTokenGenerate = async (id) =>{
//     let key = process.env.JWT_KEY;

//     let adminToken = jwt.sign({id:id}, key, {expiresIn:'30d'});
//     return adminToken;

// }


// const adminVerifyToken = async (req,res,next)=>{
//     const adminToken = req.headers.authorization;
//     if (!adminToken) {
//         return res.status(400).json({
//             success: false, 
//             message: "Admin must login..."
//         });
//     }

//     const withoutBearer = adminToken.split(" ")[1];

//     if(!withoutBearer){
//         return res.status(400).json({
//             success:false, message: "Admin must login..."
//         });
//     }

//     try{
//         const key = process.env.JWT_KEY;
//         const payload = jwt.verify(withoutBearer, key );

//         let checkToken = await menderDB.findById(
//             payload.id
//         );

//         if(!checkToken){
//             return res.status(400).json({
//                 success:false, message: "Invalid Admin"
//             })
//         }

//         req._id = checkToken._id;

//         return next();
//     }catch(error){
//         res.status(404).json({
//             success:false, message: "Invalid token"
//         })
//     }
// }
// module.exports = {
//     adminTokenGenerate,
//     adminVerifyToken
// }