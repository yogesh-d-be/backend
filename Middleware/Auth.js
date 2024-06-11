
const jwt = require("jsonwebtoken");
const userDB = require("../Model/LoginUserModel");
const userOtp = require("../Model/UserOtp"); // Require the userOtp model

const generateAuthToken = async (id) => {
  let key = process.env.JWT_SECRET;

  let newToken = jwt.sign({ id: id }, key, { expiresIn: "15d" });

  return newToken;
};

const verifyToken = async (req, res, next) => {
  let newToken = req.headers.authorization;
  if (!newToken) {
    return res.status(400).json({ Message: "User must be logged in" });
  }

  try {
    let withoutBearer = newToken.split(" ")[1];
    let key = process.env.JWT_SECRET;
    let payload = jwt.verify(withoutBearer, key);
    // console.log("keey", key);
    let checkToken = await userDB.findOne({ userID: payload.id });

    if (!checkToken) {
      return res.status(400).json({ Message: "Invalid user" });
    }

    req.userId = checkToken.userID;
    return next();
  } catch (error) {
    // console.log(error, "err")
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ Message: "Token expired" });
    }
    return res.status(404).json({ Message: "Invalid Token" });
  }
};  

module.exports = { generateAuthToken, verifyToken };
