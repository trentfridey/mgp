// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var gameData = {}; // used for passing data between rules and game

var app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('angular'));

app.get("/", function (req, res) {
  res.render('index');
});

app.get("/about", function(req, res){
  res.render('about');
});

app.post("/data", function(req, res){
  gameData.boxRule = req.body.boxRule;
  gameData.genRule = req.body.genRule;
  res.end();
});

app.get('/data', function(req, res){
  res.json(gameData);
  res.end();
})

app.get("/rule-editor", function(req, res){
  res.render('rule-editor');
});

var listener = app.listen(3000, function () {
	console.log("Listening on port " + 3000); 
});

