const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { check, validationResult } = require('express-validator');

module.exports.validPassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
}

module.exports.createUser = function (userObject) {
  return new Promise(function (resolve) {
    let userInstance = new User(userObject);
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(userInstance.password, salt, function (err, hash) {
        if (err) throw err;
        userInstance.password = hash;
        userInstance.save((err) => {
          if (err) throw err;
          resolve()
        });
      });
    });
  });
}