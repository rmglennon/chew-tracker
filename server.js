// require dependencies
var express = require("express");
var bodyParser = require("body-parser");
var firebase = require("firebase");
require("dotenv").load();

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.FIREBASE_DATABASEURL,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET
  };
  firebase.initializeApp(config);

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