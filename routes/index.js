var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { check, validationResult } = require('express-validator');

const UserController = require('../controllers/user.controller');

// GET home page.
router.get('/', function(req, res) {
  res.render('home', { page: './homePage' });
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

router.post('/signup', UserController.validateNewUser(), async function(req, res) {
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

router.get('/logement', function(req, res) {
  res.render('home', { page: './housing' });
});

router.get('/sante', function(req, res) {
  res.render('home', { page: './health' });
});

router.get('/aides-financieres', function(req, res) {
  res.render('home', { page: './money' });
});

router.get('/etudes', function(req, res) {
  res.render('home', { page: './studies' });
});

router.get('/job', function(req, res) {
  res.render('home', { page: './job' });
});

router.get('/bien-etre', function(req, res) {
  res.render('home', { page: './wellbeing' });
});

router.get('/transports', function(req, res) {
  res.render('home', { page: './transportation' });
});

router.get('/se-nourrir', function(req, res) {
  res.render('home', { page: './food' });
});

router.get('/loisirs', function(req, res) {
  res.render('home', { page: './hobbies' });
});

router.get('/bons-plans', function(req, res) {
  res.render('home', { page: './tips' });
});

module.exports = router;