/*const express = require("express");
const app = express();

const hasName = function (req, res, next) {
  if (req.param("name")) {
    next();
  } else {
    res.send("What is you name?");
  }
};
const sayHello = function (req, res, next) {
  // Use the 'response' object to send a respone with the 'name' parameter
  res.send("Hello " + req.param("name"));
};
app.get("/", hasName, sayHello);

app.use("/", function (req, res) {
  res.send("Hello World"); //send the response back
});

app.listen(3000);
console.log("Server running at http://localhost:3000/");
module.exports = app;
*/

process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Load the module dependencies
const configureMongoose = require("./config/mongoose");
const configureExpress = require("./config/express");

// Create a new Mongoose connection instance
const db = configureMongoose();

// Create a new Express application instance
const app = configureExpress();

// Use the Express application instance to listen to the '3000' port
app.listen(3000);

// Log the server status to the console
console.log("Server running at http://localhost:3000/");

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;
