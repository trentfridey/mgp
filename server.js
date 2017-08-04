// server.js
// where your node app starts

// init project
var express = require('express');
var passport = require('passport');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/about", function(req, res){
  res.sendFile(__dirname + '/views/about.html');
});

app.get("/signin", function(req, res){
  res.sendFile(__dirname + '/views/signin.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
