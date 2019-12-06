const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { check, validationResult } = require('express-validator');


module.exports.validateNewUser = function () {
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

module.exports.setFile = function (user_id, fileType, fileName) {
  return new Promise(function (resolve) {
    console.log("les arguments : ");
    console.log(user_id);
    console.log(fileType);
    console.log(fileName);
    let query;
    switch (fileType) {
      case "carteID":
        query = { $set: { "files.carteID": fileName } };
        break;
      case "certifScol":
        query = { $set: { "files.certifScol": fileName } };
        break;
      case "RIB":
        query = { $set: { "files.RIB": fileName } };
        break;
      case "photoID":
        query = { $set: { "files.photoID": fileName } };
        break;
      case "CV":
        query = { $set: { "files.CV": fileName } };
        break;
      case "justifDomi":
        query = { $set: { "files.justifDomi": fileName } };
        break;
      case "attestRecensement":
        query = { $set: { "files.attestRecensement": fileName } };
        break;
      case "diplome":
        query = { $set: { "files.diplome": fileName } };
        break;
      case "avisImpots":
        query = { $set: { "files.avisImpots": fileName } };
        break;
      case "attestSecu":
        query = { $set: { "files.attestSecu": fileName } };
        break;
      case "bail":
        query = { $set: { "files.bail": fileName } };
        break;
      case "numAllocCaf":
        query = { $set: { "files.numAllocCaf": fileName } };
        break;
      case "revenus":
        query = { $set: { "files.revenus": fileName } };
        break;
    }
    User.findByIdAndUpdate(user_id,
      query,
      (err) => {
        if (err) throw err;
        resolve();
      });
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
          resolve();
        });
      });
    });
  });
}