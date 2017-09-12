// server.js
// where your node app starts

// init project
var express = require('express');

var app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.render('index', );
});

app.get("/about", function(req, res){
  res.render('about');
});

app.get("/signin", function(req, res){
  res.render('signin');
});

app.get("/rules", function(req, res){
  res.render('rules');
  });

app.get("/rule-editor", function(req, res){
  res.render('rule-editor');
});

var listener = app.listen(3000, function () {
	console.log("Listening on port " + 3000); 
});

