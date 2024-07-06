// const userDB = require("../Model/LoginUserModel");
// const userOtp = require("../Model/UserOtp");

// const jwt = require("jsonwebtoken");
// const { generateAuthToken } = require("../Middleware/Auth");

// const LoginUserDataPost = async (req, res) => {
//   const { username, email, mobilenumber, address } = req.body;

//   if (!username || !email || !mobilenumber || !address) {
//     return res.status(400).json({ error: "Please enter all input data" });
//   }

//   try {
//     const preuser = await userDB.findOne({ email: email });

//     if (preuser) {
//       return res.status(400).json({ error: "This user already exists" });
//     }

//     const loginUserData = new userDB({ username, email, mobilenumber, address });
//     await loginUserData.save();
//     return res.status(201).json(loginUserData);

//   } catch (error) {
//     return res.status(500).json({ error: "Server error", details: error.message });
//   }
// };

// const LoginUserDataGet = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const user = await userDB.findOne({ userID: userId });

//     if (!user) {
//       return res.status(404).json({ success: false, error: "User not found" });
//     }
//     return res.status(200).json({ success: true, data: user });

//   } catch (error) {
//     return res.status(500).json({ success: false, error: "Server error", details: error.message });
//   }
// };

// const LoginUserDataEdit = async (req, res) => {
//   const { username, email, mobilenumber, address } = req.body;
//   const userId = req.userId;

//   if (!username || !email || !mobilenumber || !address) {
//     return res.status(400).json({ error: "Please enter all input data" });
//   }

//   try {
//     const user = await userDB.findOneAndUpdate(
//       { userID: userId },
//       { username, email, mobilenumber, address },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     return res.status(200).json(user);

//   } catch (error) {
//     return res.status(500).json({ error: "Server error", details: error.message });
//   }
// };

// const LoginUserDataDelete = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const result = await userDB.deleteOne({ userID: userId });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     return res.status(200).json({ message: "User deleted successfully" });

//   } catch (error) {
//     return res.status(500).json({ error: "Server error", details: error.message });
//   }
// };



// const userLogin = async (req, res) => {
//   const { email, otp } = req.body;

//   if (!otp || !email) {
//     return res.status(400).json({ error: "Please provide both OTP and email" });
//   }

//   try {
//     const otpVerification = await userOtp.findOne({ email });

//     if (!otpVerification || otpVerification.otp !== otp) {
//       return res.status(400).json({ error: "Invalid OTP" });
//     }

//     const preuser = await userDB.findOne({ email });

//     if (!preuser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const token = generateAuthToken(preuser.userID);
//     preuser.tokens.push({ token });
//     await preuser.save();

//     return res.status(200).json({ message: "User logged in successfully", userToken: token });
//   } catch (error) {
//     return res.status(500).json({ error: "Server error", details: error.message });
//   }
// };

// module.exports = { userLogin };




// module.exports = {
//   LoginUserDataPost,
//   userLogin,
//   LoginUserDataGet,
//   LoginUserDataEdit,
//   LoginUserDataDelete,
// };


// const userDB = require("../Model/LoginUserModel");
// const userOtp = require("../Model/UserOtp");
// const jwt = require("jsonwebtoken");
// const fs = require('fs');
// const path = require('path');
// const { generateAuthToken } = require("../Middleware/Auth");

// const LoginUserDataPost = async (req, res) => {
//   const { username, email, mobilenumber, address } = req.body;
//   const file = req.file;

//   if (!username || !email || !mobilenumber || !address) {
//     return res.status(400).json({ error: "Please Enter All Input Data" });
//   }

//   try {
//     const preuser = await userDB.findOne({ email });

//     if (preuser) {
//       return res.status(400).json({ error: "This User Already Exists" });
//     }

//     const loginUserData = new userDB({
//       username,
//       email,
//       mobilenumber,
//       address,
//       userPic: file ? file.filename : null
//     });
//     await loginUserData.save();
//     return res.status(200).json(loginUserData);
//   } catch (error) {
//     return res.status(400).json({ error: "Invalid Details", details: error.message });
//   }
// };

// const userLogin = async (req, res) => {
//   const { email, otp } = req.body;

//   if (!otp || !email) {
//     return res.status(400).json({ error: "Please provide both OTP and email" });
//   }

//   try {
//     const otpVerification = await userOtp.findOne({ email });

//     if (!otpVerification || otpVerification.otp !== otp) {
//       return res.status(400).json({ error: "Invalid OTP" });
//     }

//     const preuser = await userDB.findOne({ email });

//     if (!preuser) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     const token = await generateAuthToken(preuser.userID);

//     preuser.tokens.push({ token });
//     await preuser.save();

//     return res.status(200).json({ message: "User logged in successfully", userToken: token });
//   } catch (error) {
//     return res.status(400).json({ error: "Invalid details", details: error.message });
//   }
// };

// const LoginUserDataGet = async (req, res) => {
//   try {
//     const Id = req.userId;
//     const user = await userDB.findOne({ userID: Id });

//     if (!user) {
//       return res.status(404).json({ success: false, error: "User Not Found" });
//     }
//     return res.status(200).json({ success: true, data: user });
//   } catch (error) {
//     return res.status(400).json({ success: false, error: "Invalid request", details: error.message });
//   }
// };

// const LoginUserDataEdit = async (req, res) => {
//   try {
//     const { username, email, mobilenumber, address } = req.body;
//     const Id = req.userId;
//     const file = req.file;

//     const user = await userDB.findOne({ userID: Id });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const updatedFields = {
//       username,
//       email,
//       mobilenumber,
//       address,
//       userPic: file ? file.filename : user.userPic
//     };

//     if (file && user.userPic) {
//       fs.unlinkSync(path.join(__dirname, '../userFile/', user.userPic));
//     }

//     Object.assign(user, updatedFields);
//     await user.save();

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(400).json({ error: "Invalid request", details: error.message });
//   }
// };

// const LoginUserDataDelete = async (req, res) => {
//   try {
//     const Id = req.userId;
//     const user = await userDB.findOne({ userID: Id });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (user.userPic) {
//       fs.unlinkSync(path.join(__dirname, '../userFile/', user.userPic));
//     }

//     await userDB.deleteOne({ userID: Id });

//     return res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     return res.status(400).json({ error: "Invalid request", details: error.message });
//   }
// };

// const uploadUserProfilePic = async (req, res) => {
//   const Id = req.userId;
//   const file = req.file;

//   if (!file) {
//     return res.status(400).json({ error: "Please upload a file" });
//   }

//   try {
//     const user = await userDB.findOne({ userID: Id });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (user.userPic) {
//       fs.unlinkSync(path.join(__dirname, '../userFile/', user.userPic));
//     }

//     user.userPic = file.filename;
//     await user.save();

//     return res.status(200).json({ message: "Profile picture updated successfully", user });
//   } catch (error) {
//     return res.status(400).json({ error: "Invalid request", details: error.message });
//   }
// };

// const UserProfilePicDelete = async (req, res) => {
//   try {
//     const Id = req.userId;
//     const user = await userDB.findOne({ userID: Id });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (!user.userPic) {
//       return res.status(404).json({ error: "User profile picture not found" });
//     }

//     fs.unlinkSync(path.join(__dirname, '../userFile/', user.userPic));

//     user.userPic = undefined;
//     await user.save();

//     return res.status(200).json({ message: "User profile picture deleted successfully" });
//   } catch (error) {
//     return res.status(400).json({ error: "Invalid request", details: error.message });
//   }
// };

// module.exports = {
//   LoginUserDataPost,
//   userLogin,
//   LoginUserDataGet,
//   LoginUserDataEdit,
//   LoginUserDataDelete,
//   UserProfilePicDelete,
//   uploadUserProfilePic
// };






const userDB = require("../Model/LoginUserModel");
const userOtp = require("../Model/UserOtp");
const fs = require('fs')

const jwt = require("jsonwebtoken");
const { generateAuthToken } = require("../Middleware/Auth");
const createContactUserData = require("./ContactController");

const LoginUserDataPost = async (req, res) => {
  const { username, email, mobilenumber, address,userPic } = req.body;
  const userId = req.userId;// This is the authenticated user's ID from auth

  if (!username || !email || !mobilenumber || !address) {
    return res.status(400).json({ error: "Please Enter All Input Data" });
  }

  try {
    const preuser = await userDB.findOne({ email: email });

    if (preuser) {
      return res.status(400).json({ error: "This User Already Exists" });
    }
     
      const loginUserData = new userDB({
        username,
        email,
        mobilenumber,
        address,
        userID: userId,
       
      });
      await loginUserData.save();
      await createContactUserData(req, res, email);
      return res.status(200).json(loginUserData);
    
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Invalid Details", details: error.message });
  }
};

const LoginUserDataGet = async (req, res) => {
  try {
    const Id = req.userId;
    const user = await userDB.findOne({ userID: Id });

    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }
    return res.status(200).json({ success: true, data: user });

  } catch (error) {
    return res.status(400).json({ success: false, error: "Invalid request", details: error.message });
  }
};

const LoginUserDataEdit = async (req, res) => {
  try {
    const { username, email, mobilenumber, address } = req.body;
    const Id = req.userId;

    const user = await userDB.findOneAndUpdate(
      { userID: Id },
      { username, email, mobilenumber, address },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } 
  catch (error) {
    return res.status(400).json({ error: "Invalid request", details: error.message });
  }
};

const LoginUserDataDelete = async (req, res) => {
  try {
    const Id = req.userId;
    const user = await userDB.deleteOne({ userID: Id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } 
  catch (error) {
    return res.status(400).json({ error: "Invalid request", details: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, otp } = req.body;

  if (!otp || !email) {
    return res.status(400).json({ error: "Please provide both OTP and email" });
  }

  try {
    const otpVerification = await userOtp.findOne({ email });
    console.log("test", otpVerification);

    if (!otpVerification || otpVerification.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }


    const preuser = await userDB.findOne({ email });

    console.log("user", preuser);

    if (!preuser) {
      return res.status(400).json({ error: "User not found" });
    }

    const token = await generateAuthToken(preuser.userID);

    console.log("token", token);

    
    preuser.tokens.push({ token });
   await preuser.save();

    return res.status(200).json({ message: "User logged in successfully", userToken: token });
  } 
  catch (error) {
    return res.status(400).json({ error: "Invalid details", details: error.message });
  }
};

const uploadUserProfilePic = async (req, res) => {
  // const Id = req.userId;
  // const file = req.file.filename;

  // // if (!file) {
  // //   return res.status(400).json({ error: "Please upload a file" });
  // // }

  // try {
  //   const user = await userDB.findOne({ userID: Id });

  //   if (!user) {
  //     return res.status(404).json({ error: "User not found" });
  //   }

  //   // if (user.userPic) {
  //   //   fs.unlinkSync(path.join(__dirname, '../userFile/', user.userPic));
  //   // }

  //   user.userPic = file;
  //   await user.save();

  //   return res.status(200).json({ message: "Profile picture uploaded successfully", user });
  // } catch (error) {
  //   return res.status(400).json({ error: "Invalid request", details: error.message });
  // }
  

  try {
    const Id = req.userId;
  const file = req.file.filename;
    const user = await userDB.findOne({ userID: Id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // if (user.userPic) {
    //   fs.unlinkSync(`userFile/${user.userPic}`)

    // }
    user.userPic = file;
    // if (user.userPic) {
    //   fs.unlink(`userFile/${user.userPic}`, (err) => {
    //     if (err) {
    //       console.error("Failed to delete old profile picture:", err);
    //     }
    //   });
   
      
    // }

    
    await user.save();



    return res.status(200).json({ data:user, message: "Profile picture uploaded successfully", user });
  } catch (error) {
    return res.status(400).json({ error: "Invalid request", details: error.message });
  }
};

const userProfilePicDelete = async (req, res) => {
  try {
    const Id = req.userId;
    const user = await userDB.findOne({ userID: Id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.userPic) {
      return res.status(409).json({ error: "No Picture found" });
    }
    if (user.userPic) {
      fs.unlinkSync(`Public/userFile/${user.userPic}`);
    }

    user.userPic = undefined;
    await user.save();

    return res.status(200).json({ message: "User profile picture deleted successfully", user });
  } catch (error) {
    return res.status(400).json({ error: "Invalid request", details: error.message });
  }
};



// const userProfilePicDelete = async (req, res) => {
//   try {
//     const Id = req.userId;
//     const user = await userDB.findOne({ userID: Id });

//     // if (!user) {
//     //   return res.status(404).json({ error: "User not found" });
//     // }

//     if (!user.userPic) {
//       return res.status(404).json({ error: "User profile picture not found" });
//     }

//     // fs.unlinkSync(path.join(__dirname, '../userFile/', user.userPic));
//     fs.unlink(`userFile/${user.userPic}`,()=>{})
//     // user.userPic = undefined;
//     await user.save();

//     return res.status(200).json({ message: "User profile picture deleted successfully" });
//   } catch (error) {
//     return res.status(400).json({ error: "Invalid request", details: error.message });
//   }
// };

module.exports = {
  LoginUserDataPost,
  userLogin,
  LoginUserDataGet,
  LoginUserDataEdit,
  LoginUserDataDelete,
  uploadUserProfilePic,
  userProfilePicDelete
};
