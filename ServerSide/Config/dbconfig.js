const dotenv = require("dotenv");
dotenv.config({ path: "../Config.env" });
var databaseOptions = {
  // host: process.env.host,
  // database: process.env.hostdatabase,
  // user: process.env.hostuser,
  // password: process.env.hostpassword,
  // port: process.env.hostmySqlPort,
  host: "localhost",
  database: "socialmediaproject",
  user: "node",
  password: "node",
  port: 3306,
};
module.exports = { databaseOptions: databaseOptions };
