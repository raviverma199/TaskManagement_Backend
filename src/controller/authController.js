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
const { RefreshToken, AccessToken } = require("../middleware/authmiddleware");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const logger = require("../utils/ErrorHandler");

// Controller FOR CREATING THE USER
exports.CreateUser = async (req, res) => {
  try {
    let { username, email, role, password } = req.body;

    if (!username || !email || !role || !password) {
      return sendErrorResponse(res, 400, "All field are required");
    }

    if (!validator.isEmail(email)) {
      // Validate the Email
      return sendErrorResponse(res, 400, "Invalid Email");
    }

    if (!validator.isStrongPassword(password)) {
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
    logger.error("Error occured in Creating User", error);
    return sendErrorResponse(res, 500, "Internal Server Error.");
  }
};

// Controller For Login The User
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

    let AccessTok = await AccessToken(PayLoad, process.env.secret_key);
    let RefreshTok = await RefreshToken(PayLoad, process.env.secret_key);

    res.cookie("RefreshToken", RefreshTok, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    });

    res.status(200).json({
      success: true,
      AccessToken: AccessTok,
      RefreshToken: RefreshTok,
      user: {
        username: FindUser.username,
        email: FindUser.email,
        role: FindUser.role,
      },
    });
  } catch (error) {
    logger.error("Error occured in Login", error);
    return sendErrorResponse(res, 500, "Internal Server Error." + error);
  }
};

// Controller For Logout
exports.logout = async (req, res) => {
  try {
    // const refreshToken = req.cookies["RefreshToken"];
    const refreshToken = req.headers["authorization"]?.split(" ")[1];

    if (!refreshToken) {
      return sendErrorResponse(res, 400, "No refresh token provided");
    }

    res.clearCookie("RefreshToken", {
      httpOnly: true,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    logger.error("Error occured in Logout", error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};

// Controller to Assign the new Access Token
exports.refreshToken = async (req, res) => {
  try {
    // const refreshToken = req.cookies["RefreshToken"]; // Assuming the refresh token is stored in cookies
    const refreshToken = req.headers["authorization"]?.split(" ")[1];

    if (!refreshToken) {
      return sendErrorResponse(res, 400, "No refresh token provided");
    }

    jwt.verify(refreshToken, process.env.secret_key, (err, decoded) => {
      if (err) {
        return sendErrorResponse(res, 401, "Invalid or expired refresh token");
      }

      const PayLoad = {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        role: decoded.role,
      };
      let newAccessToken = AccessToken(PayLoad, process.env.secret_key);

      // Send the new access token back to the client
      return res.status(200).json({ success: true, newAccessToken });
    });
  } catch (error) {
    logger.error("Error occured in Refresh Token", error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};
