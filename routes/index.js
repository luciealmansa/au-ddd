var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { check, validationResult } = require('express-validator');

const UserController = require('../controllers/user.controller');

// GET home page.
router.get('/', function(req, res) {
  res.render('home');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/signup', function(req, res) {
  res.render('signup');
});

router.post('/signup', async function(req, res) { //TODO validate signup
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('signup', {
      errors: errors.array()
    });
  }

  let userObject = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    isGrantHolder : req.body.isGrantHolder
  };

  await UserController.createUser(userObject);
  res.render('home', { flash: 'Inscription réussie !' });
});

module.exports = router;