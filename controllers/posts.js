var express = require('express'),
	router = express.Router(),
	Post = require('../models/post');

router.get('/', function (req, res, next) {
	Post.find({}).select('-_id -__v').exec( function (err, posts) {
		if (err) {
			return next(err);
		}

		res.json(posts);
	});
});

router.get('/:slug', function (req, res, next) {
	Post.findBySlug(req.params.slug).select('-_id -__v').exec( function (err, post) {
		if (err) {
			return next(err);
		}

		res.json(post);
	});
});

router.post('/', function (req, res, next) {
	Post.createFromBody(req.body, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(201);
	});
});

router.put('/:slug', function (req, res, next) {
	Post.updateFromBodyBySlug(req.params.slug, req.body, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

router.delete('/:slug', function (req, res, next) {
	Post.findBySlug(req.params.slug).remove( function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

module.exports = router;