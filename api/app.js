var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var filmsRouteur = require('./routes/films');
var usersRouteur = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/films', filmsRouteur);
app.use('/users', usersRouteur);


module.exports = app;
