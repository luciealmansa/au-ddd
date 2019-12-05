const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');
const UserController = require('../controllers/user.controller');

module.exports = function(passport){

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    function(email, password, done) {
      User.findOne({email: email}, function(err, user){
        if(err) { return done(err);}
        if(!user) { return done(null, false, { message: 'email incorrect' });}

        UserController.validPassword(password, user.password, function(err, isMatch) {
          if(err) { return done(err);}
          if(isMatch) { return done(null, user);}
          else { return done(null, false, {message: 'mot de passe incorrect'});}
        });
      });
    }
  ));


  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
} 
