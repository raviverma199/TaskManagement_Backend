const express = require("express");
const app = express();
const AuthRoute = require("./routes/authroute");
const ProfileRoute = require("./routes/profileDataroute");
const TaskRoute = require("./routes/taskroute");
const Analytics = require("./routes/analyticsroute");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger-config");

app.use(express.json());

// Serve Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      // Specify allowed sources for scripts, styles, images
      "script-src": ["'self'", "http://localhost:2020"],
      "style-src": ["'self'", "http://localhost:2020"],
      "img-src": ["'self'", "http://localhost:2020"],
      "default-src": ["'self'"],
    },
  })
);

// header to prevent clickjacking attack
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

// For cross-site-scripting attack
app.use(helmet.xssFilter());

// API ROUTES
app.use("/api/auth", AuthRoute);
app.use("/api/profile", ProfileRoute);
app.use("/api/task", TaskRoute);
app.use("/api/stats", Analytics);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ msg: "Something Went Wrong" });
});

module.exports = app;
