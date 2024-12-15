const Task = require("../models/taskSchema");
const logger = require("../utils/ErrorHandler");
const { sendErrorResponse } = require("../utils/helper");
const { Types } = require("mongoose");
const rateLimiterMiddleware = require("../middleware/ratelimiter");

//  Create or Assign Task
exports.CreateTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, assignedTo } =
      req.body;

    const createdBy = req?.user?.id;

    if (
      !title ||
      !description ||
      !dueDate ||
      !priority ||
      !status ||
      !assignedTo
    ) {
      return sendErrorResponse(res, 400, "All fields are required");
    }

    rateLimiterMiddleware(req?.user?.role)(req, res, async () => {
      await Task.create({
        title,
        description,
        dueDate,
        priority,
        status,
        assignedTo,
        createdBy,
      });
      res.status(201).json({ message: "Task created successfully" });
    });
  } catch (error) {
    logger.error("Error occured in Creating Task", error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};

// Update the Assigned Task
exports.UpdateTask = async (req, res) => {
  try {
    let { taskId, title, description, dueDate, priority, status, assignedTo } =
      req.body;

    if (!Types.ObjectId.isValid(taskId)) {
      return sendErrorResponse(res, 400, "Invalid Object Id");
    }

    let filter = { _id: taskId };
    let update = {
      $set: {
        ...(title && { title }),
        ...(description && { description }),
        ...(dueDate && { dueDate }),
        ...(priority && { priority }),
        ...(status && { status }),
        ...(assignedTo && { assignedTo }),
      },
    };

    console.log(req?.user?.role);
    rateLimiterMiddleware(req?.user?.role)(req, res, async () => {
      let UpdateData = await Task.findByIdAndUpdate(filter, update, {
        new: true,
        runValidators: true,
      });

      if (!UpdateData) {
        return sendErrorResponse(res, 404, "No Change Detected");
      }

      res.status(200).json({ message: "Task updated successfully" });
    });
  } catch (error) {
    logger.error("Error occured in Updating Task", error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};

// Delete the Assigned Task
exports.DeleteTask = async (req, res) => {
  try {
    let { taskId } = req.body;

    if (!Types.ObjectId.isValid(taskId)) {
      return sendErrorResponse(res, 400, "Invalid Object Id");
    }

    rateLimiterMiddleware(req?.user?.role)(req, res, async () => {
      let DeleteTask = await Task.findByIdAndDelete(taskId);

      if (!DeleteTask) {
        return sendErrorResponse(res, 404, "Task Not Found");
      }

      res.status(200).json({ success: true, msg: "Task Deleted Succesfully" });
    });
  } catch (error) {
    logger.error("Error occured in Deleting Task", error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};

// View Task
exports.ViewAssignTask = async (req, res) => {
  try {
    let { id, role } = req?.user;

    if (!req?.user) {
      return sendErrorResponse(res, 404, "role and id is undefined");
    }

    rateLimiterMiddleware(role)(req, res, async () => {
      const query =
        role === "manager" || role === "admin"
          ? { createdBy: id }
          : { assignedTo: id };

      const AssignedTask = await Task.find(query)
        .populate("createdBy", "name email")
        .populate("assignedTo", "name email")
        .lean();

      res.status(200).json({
        success: true,
        tasks: AssignedTask,
      });
    });
  } catch (error) {
    logger.error("Error to View Task", error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};
