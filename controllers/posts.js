var express = require('express'),
	router = express.Router(),
	Post = require('../models/post');

router.get('/', function (req, res) {
	Post.find({}, function(err, posts) {
		if (err) res.sendStatus(500);

		res.json(posts);
	});
});

router.get('/:id', function (req, res) {
	Post.findById(req.params.id, function(err, post) {
		if (err) res.sendStatus(500);

		res.json(post);
	});
});

router.post('/', function (req, res) {
	Post.createFromBody(req.body, function (err) {
		if (err) res.sendStatus(500);

		res.sendStatus(201);
	});
});

router.put('/:id', function (req, res) {
	Post.updateFromBodyById(req.params.id, req.body, function (err) {
		if (err) res.sendStatus(500);

		res.sendStatus(200);
	})
});

router.delete('/:id', function (req, res) {
	Post.findById(req.params.id).remove( function (err) {
		if (err) res.sendStatus(500);

		res.sendStatus(200);
	})
});

module.exports = router;