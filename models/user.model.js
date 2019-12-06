var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  isGrantHolder: Boolean,
  files : Object
});

const User = mongoose.model('users', userSchema);
module.exports = User;