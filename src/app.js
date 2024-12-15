const express = require("express");
const app = express();
const Database = require("./dbconfig/dbconnection");
const AuthRoute = require("./routes/authroute");
const ProfileRoute = require("./routes/profileDataroute");
const TaskRoute = require("./routes/taskroute");
const Analytics = require("./routes/analyticsroute");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger-config");
require("dotenv").config();

Database();

app.use(express.json());

// Serve Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(helmet());

app.get("/", (req, res) => {
  res.send(200);
});

app.use("/api/auth", AuthRoute);
app.use("/api/profile", ProfileRoute);
app.use("/api/task", TaskRoute);
app.use("/api/stats", Analytics);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ msg: "Something Went Wrong" });
});

app
  .listen(process.env.PORT || 2020, () => {
    console.log("server is running on 2020");
  })
  .on("error", (err) => {
    console.log("Error: " + err);
  });
