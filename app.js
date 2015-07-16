var express = require('express'),
	env = require('./env.js'),
	db = require('./db'),
	mongoose = require('mongoose'),
	Post = require('./models/post');

var app = express();

// Connect to mongodb and run server on success
mongoose.connect(process.env.MONGO_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to database:'));
db.once('open', function () {
	console.log('Connected to database.');

	var server = app.listen(3000, function() {
		var port = server.address().port
		console.log('Listening on port %s...', port)
	})
});
