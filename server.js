// require dependencies
var express = require("express");
var bodyParser = require("body-parser");
var firebase = require("firebase");
require("dotenv").load();

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAz1tug48F42pTBzhe479jzyJEGIWORkf8",
    authDomain: "stupid-chew.firebaseapp.com",
    databaseURL: "https://stupid-chew.firebaseio.com/",
    storageBucket: ""
};
firebase.initializeApp(config);
var rootRef = firebase.database().ref();

// Helper method to write to Firebase
function writeTestData(date) {
  firebase.database().ref('/').push({
    date,
  });
}

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

app.post('/new/chew', (req, res) => {
    console.log('got the msg');
    writeTestData(new Date().getTime());
    res.send('OK!')
});
