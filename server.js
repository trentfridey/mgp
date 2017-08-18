// server.js
// where your node app starts

// init project
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passportLocalMongoose = require('passport-local-mongoose');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var app = express();
app.use(cookieParser());
app.use(expressSession({secret: 'arbitrary'}));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.Promise = global.Promise;
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

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

app.post("/login", passport.authenticate('local'), function(req, res){
	res.redirect('/');
});

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.render('index', {user: req.user});
});

app.get("/about", function(req, res){
  res.render('about',{user: req.user});
});

app.get("/signin", function(req, res){
  res.render('signin',{user: req.user});
});

app.get("/rules", function(req, res){
  res.render('rules',{user: req.user});
  });

var listener = app.listen(process.argv[2], function () {
	console.log("Listening on port " + process.argv[2]); 
})

