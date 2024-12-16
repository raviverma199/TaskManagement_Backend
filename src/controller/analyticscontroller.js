const Task = require("../models/taskSchema");
const logger = require("../utils/ErrorHandler");
const { sendErrorResponse } = require("../utils/helper");
const rateLimiterMiddleware = require("../middleware/ratelimiter");
const mongoose = require("mongoose");

exports.GetTaskStats = async (req, res) => {
  try {
    rateLimiterMiddleware(req?.user?.role)(req, res, async () => {
      const taskstats = await Task.aggregate([
        {
          $facet: {
            completedTask: [
              { $match: { status: "completed" } },
              { $count: "CompletedCount" },
            ],
            pendingTasks: [
              { $match: { status: "Pending" } },
              { $count: "PendingTask" },
            ],
            overdue: [
              { $match: { status: "pending", dueDate: { $lt: new Date() } } },
              { $count: "OverDueTask" },
            ],
          },
        },
      ]);

      const stats = taskstats[0];

      let completedTask = stats?.completedTask?.[0]?.CompletedCount || 0;
      let pendingTask = stats?.pendingTasks?.[0]?.PendingTask || 0;
      let OverDue = stats?.overdue?.[0]?.OverDueTask || 0;

      let Statics = {
        completedTask: completedTask,
        pendingTask: pendingTask,
        OverDue: OverDue,
      };

      res.status(200).json({
        success: true,
        data: Statics,
      });
    });
  } catch (error) {
    logger.error("Error occured in creating stats", error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};

exports.GetManagerTaskAnalytics = async (req, res) => {
  try {
    const { id, role } = req?.user;

    if (role !== "manager") {
      return sendErrorResponse(
        res,
        403,
        "You need to be a manager to access this data."
      );
    }

    if (!id) {
      return sendErrorResponse(res, 400, "Manager ID is required.");
    }

    const taskStats = await Task.aggregate([
      {
        $match: { createdBy: new mongoose.Types.ObjectId(id) },
      },
      {
        $group: {
          _id: "$createdBy",
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
          pendingTasks: {
            $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] },
          },
          overdueTasks: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$status", "Pending"] },
                    { $lt: ["$dueDate", new Date()] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalTasks: 1,
          completedTasks: 1,
          pendingTasks: 1,
          overdueTasks: 1,
        },
      },
    ]);

    if (taskStats.length === 0) {
      return sendErrorResponse(res, 404, "No tasks found for this manager.");
    }

    const stats = taskStats[0];

    res.status(200).json({
      success: true,
      data: {
        totalTasks: stats.totalTasks,
        completedTasks: stats.completedTasks,
        pendingTasks: stats.pendingTasks,
        overdueTasks: stats.overdueTasks,
        highPriority: stats.highPriority,
      },
    });
  } catch (error) {
    logger.error("Error occurred while fetching manager task analytics", error);
    return sendErrorResponse(res, 500, "Internal Server Error!");
  }
};

exports.SearchTask = async (req, res) => {
  try {
    const { status, priority, dueDate } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }
    if (priority) {
      filter.priority = priority;
    }
    if (dueDate) {
      filter.dueDate = { $lte: new Date(dueDate) };
    }

    if (Object.keys(filter).length === 0) {
      return sendErrorResponse(res, 404, "No Data Found");
    }

    let FilterData = await Task.find(filter).sort({ dueDate: 1 });

    if (FilterData.length === 0) {
      return sendErrorResponse(
        res,
        404,
        "No tasks found matching your criteria"
      );
    }

    res.status(200).json({ FilterData });
  } catch (error) {
    logger.error("Error Occured while search Task:", error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};
