const express = require('express');
const route = express.Router();
const { authenticate, authorizeRole } = require('../middleware/authmiddleware');
const taskController = require('../controller/taskController');
const analyticscontroller = require('../controller/analyticscontroller')


// EndPoint to create the Task
route.post("/CreateTask", authenticate, authorizeRole(['manager','admin']), taskController.CreateTask);

// EndPoint to Update the Task
route.put("/UpdateTask", authenticate, authorizeRole(['manager','admin']), taskController.UpdateTask);

// Endpoint to Delete the Task
route.delete("/DeleteTask", authenticate, authorizeRole(['manager','admin']), taskController.DeleteTask);

// Endpoint to View Task
route.get('/ViewTask', authenticate, authorizeRole(['manager', 'admin', 'user']), taskController.ViewAssignTask);


module.exports = route;