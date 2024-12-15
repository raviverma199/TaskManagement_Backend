const express = require('express');
const route = express.Router();
const { authenticate } = require('../middleware/authmiddleware');
const taskController = require('../controller/taskController');



// EndPoint to create the Task
route.post("/CreateTask", authenticate, taskController.CreateTask)

// EndPoint to Update the Task
route.post("/UpdateTask/:Id", authenticate, taskController.UpdateTask)

// Endpoint to Delete the Task
route.post("/DeleteTask/:Id", authenticate, taskController.DeleteTask)

module.exports = route;