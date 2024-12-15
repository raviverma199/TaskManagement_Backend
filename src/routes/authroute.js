const express = require("express");
const route = express.Router();

const authcontroller = require("../controller/authController");
const { authenticate } = require("../middleware/authmiddleware");
// route for creating user


route.post("/CreateUser", authcontroller.CreateUser);

route.post("/LoginUser", authcontroller.loginuser);

route.post("/logout", authenticate, authcontroller.logout);

route.post("/RefreshToken", authenticate, authcontroller.refreshToken);

module.exports = route;
