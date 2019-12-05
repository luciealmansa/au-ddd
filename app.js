const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const indexRouter = require('./routes/index');

const app = express();
const mongoDB = 'mongodb+srv://dbAdmin:admin@auddd-htb5o.azure.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoDB, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console,'MongoDB connection error:'));



//session 
app.use(session({ secret: 'secret',
                  resave: false,
                  saveUninitialized: false}));

// passport
require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));


//flash
app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.use(function(req, res, next){
    res.status(404);
  
    // respond with html page
    if (req.accepts('html')) {
      res.render('home', { url: req.url, page: './404' });
      return;
    }
  
    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('Not found');
  });

const port = 3000;

app.listen(port, () => {
  console.log('Server is listenning on port ' + port);;
})
