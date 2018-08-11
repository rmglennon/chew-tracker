// require dependencies
var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

// initialize Express
var app = express();

// use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json({
  type: "application/json"
}));

// serve the public directory
app.use(express.static("public"));

// listen for the routes
app.listen(PORT, function() {
  console.log("App is running");
});