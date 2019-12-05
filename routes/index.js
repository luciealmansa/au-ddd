var express = require('express');
var router = express.Router();
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { check, validationResult } = require('express-validator');

const multer = require('multer');
//multer
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, req.user._id + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage});

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

router.get('/testUpload', function(req, res) {
  res.render('testUpload');
});

router.post('/testUpload', upload.single('file'), function(req,res) {
  console.log('storage location is ', req.hostname +'/' + req.file.path);
  return res.send(req.file);
});

module.exports = router;