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

// passport
require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

//session 
app.use(session({ secret: 'secret',
                  resave: false,
                  saveUninitialized: false}));

//flash
app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);

const port = 3000;

app.listen(port, () => {
  console.log('Server is listenning on port ' + port);;
})
