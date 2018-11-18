var mongoose = require('mongoose');  
var Schema = mongoose.Schema; 
var bcrypt   = require('bcrypt-nodejs');

/*var userSchema = mongoose.Schema({  
  local: {
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
});*/

var userSchema = new Schema({
    local: {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        resetPasswordToken: String,
        resetPasswordExpires: Date
    }
});
userSchema.methods.generateHash = function(password) {  
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {  
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);  

/*var Pet = new Schema({
    name: { type: String, unique: true, required: true},
    age: {type: String},
    descs: [Desc]
});*/