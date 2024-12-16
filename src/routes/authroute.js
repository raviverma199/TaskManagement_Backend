const express = require("express");
const route = express.Router();
const RateLimiter = require("express-rate-limit");
const authcontroller = require("../controller/authController");
const { authenticate } = require("../middleware/authmiddleware");

const limiter = RateLimiter({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50,
  message: "Too many requests from this IP, please try again after a minute.",
});

// route for creating user
route.post("/CreateUser", limiter, authcontroller.CreateUser);

route.post("/LoginUser", limiter, authcontroller.loginuser);

route.post("/logout", authenticate, authcontroller.logout);

route.post("/RefreshToken", authenticate, authcontroller.refreshToken);

module.exports = route;
