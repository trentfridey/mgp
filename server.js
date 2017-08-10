// server.js
// where your node app starts

// init project
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb://localhost:27017/mgp",{useMongoClient: true}); // Currently only runs server locally
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db err'));
db.once('open',function(){
  console.log('connected');
});
var userSchema = mongoose.Schema({
    email: String,
    name: String,
    pass: String
  });
var User = mongoose.model('User',userSchema);
app.post("/adduser", function(req, res){
  var user = new User(req.body);
  user.save()
    .then(function(item){res.send("It works!")})
    .catch(function(err){res.status(400).send("Unable to save to database.")});
});

app.get("/login", function(req, res){
  User.find({name: req.body.name, pass: req.body.pass}, function(err,db){})
});

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/about", function(req, res){
  res.sendFile(__dirname + '/views/about.html');
});

app.get("/signin", function(req, res){
  res.sendFile(__dirname + '/views/signin.html');
});

var listener = app.listen(process.argv[2], function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
