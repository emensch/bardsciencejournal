var express = require('express'),
	router = express.Router(),
	Post = require('../models/post');

router.get('/', function (req, res) {
	Post.find({}, function(err, posts) {
		if (err) throw err

		res.json(posts)
	});
});

router.get('/:id', function (req, res) {
	Post.findById(req.params.id, function(err, post) {
		if (err) throw err

		res.json(post)
	});
});

router.post('/', function (req, res) {
	newPost = new Post({
		title: req.body.title,
		photo: req.body.photourl,
		category: req.body.category,
		type: req.body.type,
		content: req.body.content,
	});

	for (author of req.body.authors) {
		newPost.authors.push({ name: author })
	} 

	for (tag of req.body.tags) {
		newPost.tags.push({ name: tag })
	}

	newPost.save( function (err) {
		if (err) res.sendStatus(500);
		console.log('New post added with id: ', req.params.id);
		res.sendStatus(201);
	})
});

router.put('/:id', function (req, res) {
	Post.findById(req.params.id, function(err, post) {
		if (err) throw err

		post.title = req.body.title;
		post.photo = req.body.photourl;
		post.category = req.body.category;
		post.type = req.body.type;
		post.content = req.body.content;
		post.edits.push({ description: req.body.description });

		post.authors = [];
		for (author of req.body.authors) {
			post.authors.push({ name: author })
		} 

		post.tags = [];
		for (tag of req.body.tags) {
			post.tags.push({ name: tag })
		}

		post.save( function (err) {
			if (err) res.sendStatus(500);

			res.sendStatus(201);
		})
	});
});

router.delete('/:id', function (req, res) {
	Post.findById(req.params.id).remove( function (err) {
		if (err) res.sendStatus(500);
		console.log('Remove post with id: ', req.params.id);
		res.sendStatus(200);
	})
});

module.exports = router;