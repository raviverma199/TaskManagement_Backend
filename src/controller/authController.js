const ExecuteQuery = require("../dbconfig/dbconnection");
const User = require("../models/userSchema");
const {
  BcryptPassword,
  ValidatePassword,
  sendConfirmationEmail,
  sendErrorResponse,
  EncryptPassword,
} = require("../utils/helper");
const validator = require("validator");
const { GenerateToken } = require("../middleware/authmiddleware");
require("dotenv").config();

// API FOR CREATING THE USER
exports.CreateUser = async (req, res) => {
  try {
    let { username, email, role, password } = req.body;

    if (!validator.isEmail(email)) {
      // Validate the Email
      return sendErrorResponse(res, 400, "Invalid Email");
    }

    if (!ValidatePassword(password)) {
      // Validate the Password
      return sendErrorResponse(
        res,
        400,
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }

    let isUserExist = await User.findOne({ email });

    if (isUserExist) return sendErrorResponse(res, 400, "User Already Exist !");

    let HashedPassword = await BcryptPassword(password);

    await User.create({ username, email, role, password: HashedPassword });

    // confirmation email upon successful registration
    await sendConfirmationEmail(email, username);

    res.status(200).json({ success: true, msg: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error. Please try again later.",
    });
  }
};

// API FOR LOGIN THE USER

exports.loginuser = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!validator.isEmail(email)) {
      // Validate the Email
      return sendErrorResponse(res, 400, "Invalid Email");
    }

    if (!ValidatePassword(password)) {
      // Validate the password
      return sendErrorResponse(
        res,
        400,
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }

    let FindUser = await User.findOne({ email }); // Finding User
    if (!FindUser) {
      return sendErrorResponse(res, 400, "User Not Found");
    }

    let isPasswordCorrect = await EncryptPassword(password, FindUser.password);
    if (!isPasswordCorrect) {
      return sendErrorResponse(res, 400, "Incorrect password.");
    }

    let PayLoad = {
      id: FindUser._id,
      username: FindUser.username,
      email: FindUser.email,
      role: FindUser.role,
    };

    let Token = await GenerateToken(PayLoad, process.env.secret_key);

    res.status(200).json({
      success: true,
      Token: Token,
      user: {
        username: FindUser.username,
        email: FindUser.email,
        role: FindUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, Errormsg: "Internal Server Error" });
  }
};






exports.logout = async(req, res) =>{
  try {
    
  } catch (error) {
    console.error(error)
  }
}