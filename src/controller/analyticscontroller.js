const Task = require("../models/taskSchema");
const logger = require("../utils/ErrorHandler");
const { sendErrorResponse } = require("../utils/helper");
const rateLimiterMiddleware = require("../middleware/ratelimiter");

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
