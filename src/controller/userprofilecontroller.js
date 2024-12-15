const User = require("../models/userSchema");
const { sendErrorResponse } = require("../utils/helper");
const logger = require("../utils/ErrorHandler");
const rateLimiterMiddleware = require("../middleware/ratelimiter");

exports.GetUserProfile = async (req, res) => {
  try {
    const Token = req.headers.authorization.split(" ")[1];

    if (!Token) {
      return sendErrorResponse(
        res,
        401,
        "No token provided. Unauthorized access."
      );
    }

    let { id, role } = req.user;
    rateLimiterMiddleware(role)(req, res, async () => {
      let UserData = await User.findById({ _id: id });

      if (!UserData) {
        return sendErrorResponse(res, 404, "User Not Found");
      }

      res.status(200).json({
        success: true,
        msg: "User Profile Data",
        ProfileData: UserData,
      });
    });
  } catch (error) {
    logger.error("Error occured in Creating User", error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};
