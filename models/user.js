var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
    fullname : {type : String },
    email :    { type : String },
    password : {type : String },
    movies : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : "Movie"
    }]
});

userSchema.methods.encryptPassword = function(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync((10)));  
};

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

var userModel = mongoose.model("User", userSchema);
module.exports = userModel; 