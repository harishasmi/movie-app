var express = require("express");
var router = express.Router();

var Movie = require("../models/movie");
var User = require("../models/user");

// URL ==>  /movie/...

//  ../movie/
router.get("/",function(req, res){
     User.findById(req.user._id).populate("movies").exec(function(err,foundUser){
       if(err){ console.log(err); }
       else{
           // console.log(foundUser.movies);
           res.json(foundUser.movies);
       }
    });   
});

router.post("/", function(req, res){
    var newMovie = {
        poster : req.body.Poster, 
        imdbID : req.body.imdbID,
        title : req.body.Title,
        actors : req.body.Actors,
        released : req.body.Released,
        genre   : req.body.Genre,
        plot : req.body.Plot
    };
    User.findById(req.user._id, function(err, foundUser) {
       if(err){
           console.log(err);
           //res.redirect("/profile/" + foundUser._id);
       }
       else{
           Movie.create(newMovie, function(err, newMovie){
               if(err) { console.log(err) }
               else{
                   foundUser.movies.push(newMovie);
                   foundUser.save();
                   //res.redirect("/profiles/" + foundUser._id);
                   res.json(newMovie);
               }
           });
           
       }
    });
    
});

module.exports = router;


