// server.js
// where your node app starts

// init project
var session = require('cookie-session');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');

app.use(session({
  name:'session',
  keys:['key1','key2']
}));
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
  req.session.data = {};
  req.session.data.boxRule = req.body.boxRule;
  req.session.data.genRule = req.body.genRule;
  res.end();
});

app.get('/data', function(req, res){
  res.json(req.session.data);
  res.end();
})

app.get("/rule-editor", function(req, res){
  res.render('rule-editor');
});

var listener = app.listen(3000, function () {
	console.log("Listening on port " + 3000); 
});

