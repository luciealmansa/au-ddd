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
  res.render('home', { page: './homePage', user : req.user });
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
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
  res.render('home', { page : './homePage', flash: 'Inscription réussie !', user : req.user });
});

router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/testUpload', function(req, res) {
  res.render('testUpload');
});

router.post('/testUpload', upload.single('file'), function(req,res) {
  console.log('storage location is ', req.hostname +'/' + req.file.path);
  return res.send(req.file);
});

router.post('/newReminder', async function(req, res) { //TODO sanitize reminder :))))))))))))
  let reminderObject = {
    date: new Date(req.body.date),
    title: req.body.title,
    description: req.body.description,
    user: req.user._id
  };

  await ReminderController.createReminder(reminderObject);
  res.redirect('/');
});

router.get('/logement', function(req, res) {
  res.render('home', { page: './housing', user : req.user });
});

router.get('/sante', function(req, res) {
  res.render('home', { page: './health', user : req.user });
});

router.get('/aides-financieres', function(req, res) {
  res.render('home', { page: './money', user : req.user });
});

router.get('/etudes', function(req, res) {
  res.render('home', { page: './studies', user : req.user });
});

router.get('/job', function(req, res) {
  res.render('home', { page: './job' , user : req.user});
});

router.get('/bien-etre', function(req, res) {
  res.render('home', { page: './wellbeing', user : req.user });
});

router.get('/transports', function(req, res) {
  res.render('home', { page: './transportation', user : req.user });
});

router.get('/se-nourrir', function(req, res) {
  res.render('home', { page: './food', user : req.user});
});

router.get('/loisirs', function(req, res) {
  res.render('home', { page: './hobbies', user : req.user});
});

router.get('/bons-plans', function(req, res) {
  res.render('home', { page: './tips', user : req.user});
});

module.exports = router;