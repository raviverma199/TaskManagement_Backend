const express = require('express');
const route = express.Router();
const { authenticate, authorizeRole } = require('../middleware/authmiddleware');
const analyticscontroller = require('../controller/analyticscontroller')


// Endpoint to view the analytics of task assignment for admin
route.get('/ViewTaskStats',authenticate, authorizeRole(["admin"]), analyticscontroller.GetTaskStats)


// Endpoint to view the analytics of task managment for manager
route.get('/ViewStatsManager', authenticate, authorizeRole(["manager"]), analyticscontroller.GetManagerTaskAnalytics)


// Endpoint to view the filter Data
route.get('/FilterRecord', authenticate, authorizeRole(["manager", "admin"]), analyticscontroller.SearchTask);

module.exports = route;