const app = require("./app");
const Database = require("./dbconfig/dbconnection");
require("dotenv").config();
Database();

app
  .listen(process.env.PORT || 2020, () => {
    console.log("server is running on 2020");
  })
  .on("error", (err) => {
    console.log("Error: " + err);
  });
