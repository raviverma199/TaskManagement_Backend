const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const logger = require("../utils/ErrorHandler");

// Function to sending Error Response
const sendErrorResponse = (res, status, errorMessage) => {
  res.status(status).json({ success: false, errorMessage });
};

// function to bcrypt the password
const BcryptPassword = async (password) => {
  try {
    const SaltRound = 10;

    let HashedPassword = await bcrypt.hash(password, SaltRound);

    return HashedPassword;
  } catch (error) {
    logger.error("Error occured while Bcrypt Password", error);
  }
};

// Function to encrpyt the Password
const EncryptPassword = async (PlainPassword, HasedPassword) => {
  try {
    let EncryptPassword = await bcrypt.compare(PlainPassword, HasedPassword);

    return EncryptPassword;
  } catch (error) {
    logger.error("Error occured in Encrypt Task", error);
  }
};

// Function to Validate the password
const ValidatePassword = async (password) => {
  try {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  } catch (error) {
    logger.error("Error occured in Validate password", error);
  }
};

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ravi.vermaa120@gmail.com",
    pass: "deiu xzcr bulj czcz",
  },
});

// Function to send confirmation email
const sendConfirmationEmail = async (toEmail, username) => {
  const mailOptions = {
    from: "ravi.vermaa120@gmail.com", // Sender address
    to: toEmail, // Receiver's email
    subject: "Welcome", // Subject of the email
    text: `Hello ${username},\n\nThank you for registering. We are excited to have you onboard!`, // Email content
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
};

module.exports = {
  BcryptPassword,
  ValidatePassword,
  sendConfirmationEmail,
  sendErrorResponse,
  EncryptPassword,
};
