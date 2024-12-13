const express = require("express");
const route = express.Router();

const authcontroller = require("../controller/authController");

// route for creating user

route.post("/CreateUser", authcontroller.CreateUser);

route.post('/LoginUser', authcontroller.loginuser)


module.exports = route;
