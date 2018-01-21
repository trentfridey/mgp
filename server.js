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
  if(req.session.data){
    res.json(req.session.data);
  } else {
    res.json({boxRule:
               {stayAlive:
                [{ctrl1: false, ctrl2: false, ctrl3: false, ctrl4: false, ctrl5: false, ctrl6: false, ctrl7:false, ctrl8:false}],
                toAlive:
                [{ctrl1: false, ctrl2: false, ctrl3: false, ctrl4: false, ctrl5: false, ctrl6: false, ctrl7:false, ctrl8:false}]},
               genRule:
               {stayAlive:
                [{list: [1,2,3,4,5,6,7,8], current: 2}, {list: [1,2,3,4,5,6,7,8], current: 3}],
                toAlive:
                [{list: [1,2,3,4,5,6,7,8], current: 3}]}});
  }
    res.end();
})

app.get("/rule-editor", function(req, res){
  res.render('rule-editor');
});

var listener = app.listen(3000, function () {
	console.log("Listening on port " + 3000); 
});

