var express = require("express");
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
var bodyParser = require("body-parser");
var session = require("express-session");
var mongoose = require("mongoose");
var passport = require("passport");

var app = express();

app.use(express.static(__dirname + "/public"));
mongoose.connect(process.env.DATABASEURL);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(cookieParser());

app.use(session({
    secret : "Very Big Secret statement",
    resave : true,
    saveUninitialized : true
}));

// Flash and Passport needs to be setup after cookie and session middleware
app.use(flash());  
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport");

/* Middlewares */
app.use(function(req, res , next){
   res.locals.currentUser = req.user;  
   next();
});


// Routes
var userRoute = require("./routes/user");
var movieRoute = require("./routes/movie");

// Using routes
app.use("/",userRoute);
app.use("/movie", movieRoute);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});