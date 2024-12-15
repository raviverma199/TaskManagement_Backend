const express = require("express");
const app = express();
const Database = require("./dbconfig/dbconnection");
const AuthRoute = require("./routes/authroute");
const ProfileRoute = require("./routes/profileDataroute");
const TaskRoute = require("./routes/taskroute")
const RateLimit = require("express-rate-limit");
Database();
app.use(express.json());

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2,
  message: "Too many requests from this IP, please try again later.",
});

// app.use(limiter);

app.use("/auth", AuthRoute);
app.use("/api", ProfileRoute, TaskRoute);

app
  .listen(3333, () => {
    console.log("server is running on 3333");
  })
  .on("error", (err) => {
    console.log("Error: " + err);
  });
