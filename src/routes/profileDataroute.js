const express = require('express');
const route = express.Router();
const UserProfileData = require('../controller/userprofilecontroller');
const { authenticate }  = require('../middleware/authmiddleware');

route.get('/GetUserProfile', authenticate, UserProfileData.GetUserProfile)


module.exports = route;