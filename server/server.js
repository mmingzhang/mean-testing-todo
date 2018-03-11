const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var morgan = require('morgan');

var app = express();
const port = process.env.PORT || 8880;

// set the static files location
app.use('/js', express.static(__dirname + './../public/js'));
app.use('/css', express.static(__dirname + './../public/css'));
app.use('/image', express.static(__dirname + './../public/image'));

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json());

require('./routes.js')(app);

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
