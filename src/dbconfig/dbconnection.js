const mongoose = require("mongoose");
require('dotenv').config()

let ConnectionString = process.env.DbConnString;

const ConnectDB = async () => {
  try {
    let conn = await mongoose.connect(ConnectionString);
    console.log("connection is successfull: " + conn.connection.host);
  } catch (error) {
    console.log(error);
    process.exit = 1;
  }
};

module.exports = ConnectDB;
