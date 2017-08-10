// server.js
// where your node app starts

// init project
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passportLocalMongoose = require('passport-local-mongoose');

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
    username: String,
    password: String
  });
userSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', userSchema);

passport.use(new LocalStrategy(userSchema.authenticate()));
passport.serializeUser(userSchema.serializeUser());
passport.deserializeUser(userSchema.deserializeUser());

app.post("/adduser", function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
  	if(err){
  		return res.send('It done broke')
  	}
  	passport.authenticate('local')(req, res, function(){
  		res.redirect('/')
  	});
  }); 
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

app.get("/rules", function(req, res){
  res.sendFile(__dirname + '/views/rules.html');
  });

var listener = app.listen(process.argv[2], function () {
	console.log("Listening on port " + process.argv[2]); 
})

