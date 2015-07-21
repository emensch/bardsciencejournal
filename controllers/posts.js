var express = require('express'),
	router = express.Router(),
	Post = require('../models/post');

router.get('/', function (req, res) {
	Post.find({}).select('-_id -__v').exec( function (err, posts) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}

		res.json(posts);
	});
});

router.get('/:slug', function (req, res) {
	Post.findBySlug(req.params.slug).select('-_id -__v').exec( function (err, post) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}

		res.json(post);
	});
});

router.post('/', function (req, res) {
	Post.createFromBody(req.body, function (err) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}

		res.sendStatus(201);
	});
});

router.put('/:slug', function (req, res) {
	Post.updateFromBodyBySlug(req.params.slug, req.body, function (err) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}

		res.sendStatus(200);
	});
});

router.delete('/:slug', function (req, res) {
	Post.findBySlug(req.params.slug).remove( function (err) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}

		res.sendStatus(200);
	});
});

module.exports = router;