var express = require('express'),
	env = require('./env.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	ng_interceptor = require('./middlewares/ng_interceptor');

var app = express();

app.use(passport.initialize());

app.use('/api', require('./controllers'));

app.use(ng_interceptor([
	'/archive',
	'/about',
	'/post/*',
], 'public/index.html'));

app.use(ng_interceptor([
	'/admin/login',
	'/admin/resetpassword',
	'/admin/register',
], 'public/admin/index.html'));

app.use(express.static('public'));
app.use('/bower_components', express.static('bower_components'));

// Connect to mongodb and run server on success
mongoose.connect(process.env.MONGO_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to database:'));
db.once('open', function () {
	console.log('Connected to database.');
});

var server = app.listen(3001, function() {
	var port = server.address().port
	console.log('Listening on port %s...', port)
});

