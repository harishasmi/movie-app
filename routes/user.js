var express = require("express");
var router = express.Router();
var User = require("../models/user");

var passport = require("passport");

router.get("/", function(req, res){
   res.render("landing"); 
});

router.get("/signup", function(req, res){
   res.render("auth/signup", {signupError : req.flash("signupError")}); 
});



router.post('/signup', passport.authenticate('local.signup', 
  { 
     successRedirect: '/profile',
     failureRedirect: '/signup',
     failureFlash: true,
  })
);
  


router.get("/login", function(req, res) {
    res.render("auth/login", {loginError : req.flash("loginError")});
});

router.post("/login", passport.authenticate('local.login', 
  { 
     successRedirect: '/profile',
     failureRedirect: '/login',
     failureFlash: true,
  })
);


router.get("/profile",isLoggedIn, function(req, res) {
    User.findOne({email : req.user.email},function(err,foundUser){
        if(err){console.log(err);}
        else{
            res.render("profile",{ user : req.user, welcomeFlash : req.flash("welcomeFlash")});
        }
    });
});

router.get("/profile/:id",isLoggedIn,function(req, res) {
    User.findById(req.params.id).populate("movies").exec(function(err,foundUser){
       if(err){ console.log(err); }
       else{
           //console.log(foundUser.movies);
           res.render("profile-other", { foundUser : foundUser });
       }
    });
});

router.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/");
});



router.get("/users",function(req, res) {
    User.find({'_id': {$ne: req.user._id}},function(err,allUsers){
       if(err){console.log(err);}
       else{
           res.json(allUsers);
       }
    });
});

module.exports = router;


function isLoggedIn(req, res, next){
   if(req.isAuthenticated()){
      return next();
   }
   res.redirect("/login");
}