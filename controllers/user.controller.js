const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { check, validationResult } = require('express-validator');


module.exports.validateNewUser = function() {
  return [
    check('firstName').not().isEmpty().withMessage('Prénom requis'),
    check('lastName').not().isEmpty().withMessage('Nom de famille requis'),
    check('email').isEmail().withMessage('email non valide').custom((value, { req }) => {//email unique dans la DB
      return new Promise((resolve, reject) => {
        User.findOne({ email: req.body.email }, function (err, user) {
          if (err) {
            reject(new Error('Erreur Serveur'))
          }
          if (Boolean(user)) {
            reject(new Error('Email déjà utilisé'))
          }
          resolve(true)
        });
      });
    }),
    check('password').isLength({ min: 5 }).withMessage('le mot de passe doit faire au moins 5 caractères'),
    check('isGrantHolder').not().isEmpty().withMessage('veuillez préciser si vous êtes boursier').matches(/(^true$|^false$)/).withMessage('veuillez préciser si vous êtes boursier')
  ];
}

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