var mongoose = require("mongoose");

var movieSchema = mongoose.Schema({
    poster      : {type : String },
    imdbID      : {type : String },
    title       : {type : String },
    actors      : {type : String },
    released    : {type : String },
    genre       : {type : String },
    plot        : {type : String }
});


var movieModel = mongoose.model("Movie", movieSchema);
module.exports = movieModel; 