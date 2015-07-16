var express = require('express'),
	env = require('./env.js'),
	db = require('./db'),
	mongoose = require('mongoose'),
	Post = require('./models/post');

var app = express();
/*
app.get('/', function (req, res) {
	Post.find({}, function(err, posts) {
		if (err) throw err

		res.json(posts)
	});
});

app.post('/:id', function (req, res) {
	newPost = new Post({
		title: parseInt(req.params.id),
		photo: 'photourl',
		category: 'biology',
		type: 'interview',
		content: 'lelelelele this is a new post',
	});

	newPost.save(function(err) {
		if (err) res.sendStatus(500);
		console.log("New post added with id: ", req.params.id);
		res.sendStatus(200);
	})
})
*/

app.use(require('./controllers'));

// Connect to mongodb and run server on success
mongoose.connect(process.env.MONGO_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to database:'));
db.once('open', function () {
	console.log('Connected to database.');

	var server = app.listen(3000, function() {
		var port = server.address().port
		console.log('Listening on port %s...', port)
	});
});
