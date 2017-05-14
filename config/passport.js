var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require("../models/user");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local.login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true            
    },  
    function(req, email, password, done) {      
        User.findOne({ email : email }, function(err, user) {
          if (err) { return done(err); }        
          if (!user) {                          
            req.flash("loginError", "No User account exists in the application with this email");
            return done(null, false);
          }
          
          if(!user.validatePassword(req.body.password)){
            return done(null, false, req.flash("loginError", "Passowrd is incorrect"));
          }
          return done(null, user, req.flash("welcomeFlash", "Welcome back " + user.fullname));  
        });
     }
));


passport.use('local.signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true            
    },  
    function(req, email, password, done) {      
        User.findOne({ email : email }, function(err, user) {
          if (err) { return done(err); }        
          if (user) {                           
            return done(null, false, req.flash("signupError",'An account already exists in the application with the same email.'));
          }
          
          var newUser = new User();
          newUser.fullname = req.body.fullname;
          newUser.email = req.body.email;
          newUser.password = newUser.encryptPassword(req.body.password);   
          
          newUser.save(function(err){
              if(err){
                  return done(err);
              }
              else{
                  
                  return done(null, newUser, req.flash("welcomeFlash", "Thanks for joining up  " + newUser.fullname));  
                  
              }
          })
        });
     }
));