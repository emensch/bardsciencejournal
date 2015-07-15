var express = require('express'),
	env = require('./env.js'),
	db = require('./db');

var app = express();

// Setup DB connection and start server
db.connect(process.env.MONGO_URL, function (err) {
	if (err) {
		console.log('Unable to connect to database.\n', err)
		process.exit(1)
	} else {
		 var server = app.listen(3000, function() {
		 	var port = server.address().port
			console.log('Listening on port %s...', port)
		})
	}
})

