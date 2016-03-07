var express = require('express'),
	env = require('./env.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	path = require('path');

var app = express();

app.use(passport.initialize());

app.use('/api', require('./controllers'));

if(process.env.NODE_ENV !== 'production') {
	app.use(express.static('public'));
	app.use('/bower_components', express.static('bower_components'));
}

app.get('/admin/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'public/admin/index.html'));
});

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

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

