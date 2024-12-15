const express = require("express");
const app = express();
const Database = require("./dbconfig/dbconnection");
const AuthRoute = require("./routes/authroute");
const ProfileRoute = require("./routes/profileDataroute");
const TaskRoute = require("./routes/taskroute");
const helmet = require('helmet');

Database();

app.use(express.json());
app.use(helmet())

app.use("/auth", AuthRoute);
app.use("/api/profile", ProfileRoute);
app.use("/api/task", TaskRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ msg: "Something Went Wrong" });
});

app
  .listen(3333, () => {
    console.log("server is running on 3333");
  })
  .on("error", (err) => {
    console.log("Error: " + err);
  });
