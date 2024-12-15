const { RateLimiterMemory } = require("rate-limiter-flexible");

const rateLimiterConfigs = {
  admin: {
    points: 100,
    duration: 60, // in seconds
  },
  manager: {
    points: 70,
    duration: 60, // in seconds
  },
  user: {
    points: 50,
    duration: 60, // in seconds
  },
};

const AdminLimiter = new RateLimiterMemory(rateLimiterConfigs.admin);
const ManagerLimiter = new RateLimiterMemory(rateLimiterConfigs.manager);
const UserLimiter = new RateLimiterMemory(rateLimiterConfigs.user);

const RateLimitMiddleware = (role) => {
  try {
    let limiter;

    switch (role) {
      case "admin":
        limiter = AdminLimiter;
        break;

      case "manager":
        limiter = ManagerLimiter;
        break;

      case "user":
        limiter = UserLimiter;
        break;

      default:
        limiter = AdminLimiter;
    }

    return (req, res, next) => {
      limiter
        .consume(req.ip)
        .then(() => {
          next();
        })
        .catch((error) => {
          res.status(209).json({ success: false, msg: "Too many Request" });
        });
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = RateLimitMiddleware;
