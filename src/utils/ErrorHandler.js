const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

// Logger configuration
const logger = createLogger({
  level: "info", // Adjust levels (error, warn, info, debug) as needed
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // Include stack traces
    logFormat
  ),
  transports: [
    new transports.Console(), // Logs to console
    new transports.File({ filename: "logs/error.log", level: "error" }), // Errors to file
    new transports.File({ filename: "logs/combined.log" }), // All logs
  ],
});

module.exports = logger;
