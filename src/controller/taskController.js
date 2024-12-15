const Task = require("../models/taskSchema");
const logger = require("../utils/ErrorHandler");
const { sendErrorResponse } = require("../utils/helper");

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
  } catch (error) {
    logger.error("Error occured in Creating Task", error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};

// Update the Assigned Task
exports.UpdateTask = async (req, res) => {
  try {
    let { id } = req?.params;
    let { title, description, dueDate, priority, status, assignedTo } =
      req.body;

    let filter = { _id: id };
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

    let UpdateData = await Task.findByIdAndUpdate(filter, update, {
      new: true,
      runValidators: true,
    });

    if (!UpdateData) {
      return sendErrorResponse(res, 404, "No Change Detected");
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    logger.error("Error occured in Updating Task", error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};

// Delete the Assigned Task
exports.DeleteTask = async (req, res) => {
  try {
    let { id } = req.params;

    let DeleteTask = await Task.findByIdAndDelete(id);

    if (!DeleteTask) {
      return sendErrorResponse(res, 404, "Task Not Found");
    }

    res.status(200).json({ success: true, msg: "Task Deleted Succesfully" });
  } catch (error) {
    logger.error("Error occured in Deleting Task", error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};
