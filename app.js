var express = require('express');

var indexRouter = require('./routes/index');
var bodyParser = require('body-parser')

var app = express();


// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true'
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup

app.set('view engine', 'ejs')

app.use('public', express.static('/public'))
app.use('views', express.static('/views'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.listen(3000, function(){
    console.log('App listening on port 3000 !')
})

module.exports = app;