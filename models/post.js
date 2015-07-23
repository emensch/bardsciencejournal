var mongoose = require('mongoose'),
	slug = require('slug'),
	Schema = mongoose.Schema;

var postSchema = new Schema({
	title: { type: String, required: true }, 
	slug: { type: String, required: true, unique: true, index: true },
	photo: { type: String, required: true },
	category: { type: String, required: true },
	type: { type: String, required: true },
	content: { type: String, required: true },
	authors: [{ _id: false, name: { type: String, required: true } }],
	tags: [{ _id: false, name: { type: String, required: true } }],
	edits: [{ _id: false, 
		description: { type: String, required: true }, 
		date: { type: Date, default: Date.now }}],
	date: { type: Date, default: Date.now }
});

postSchema.statics.findAll = function (cb) {
	this.find({})
	.select('-_id -__v')
	.exec( function (err, post) {
		if (err) {
			cb(err);
		}

		cb(null, post);
	})
};

postSchema.statics.findBySlug = function (slug, cb) {
	this.findOne({ slug: slug })
	.select('-_id -__v')
	.exec( function (err, post) {
		if (err) {
			cb(err);
		}

		if(!post) {
			var err = new Error();
			err.http_code = 404;
			return cb(err);
		}

		cb(null, post);
	});
};

postSchema.statics.deleteBySlug = function (slug, cb) {
	this.findOneAndRemove({ slug: slug }, function (err, post) {
		if (err) {
			cb(err);
		}

		if(!post) {
			var err = new Error();
			err.http_code = 404;
			return cb(err);
		}

		cb(null, err);
	})
};

postSchema.statics.createFromBody = function (body, cb) {
	newPost = new this({
		title: body.title,
		photo: body.photourl,
		category: body.category,
		type: body.type,
		content: body.content,
	});

	for (author of body.authors) {
		newPost.authors.push({ name: author });
	} 

	for (tag of body.tags) {
		newPost.tags.push({ name: tag });
	}

	newPost.save( function (err) {
		if (err) {
			if (err.name == 'ValidationError') {
				err.http_code = 400;
			} else if (!err.http_code && err.code == 11000) {
				err.http_code = 409;
			}
			return cb(err);
		}

		cb();
	});
};

postSchema.statics.updateFromBodyBySlug = function (slug, body, cb) {
	this.findOne({ slug: slug }, function (err, post) {
		if (err) cb(err);

		post.title = body.title;
		post.photo = body.photourl;
		post.category = body.category;
		post.type = body.type;
		post.content = body.content;
		post.edits.push({ description: body.description });

		post.authors = [];
		for (author of body.authors) {
			post.authors.push({ name: author })
		} 

		post.tags = [];
		for (tag of body.tags) {
			post.tags.push({ name: tag })
		}

		post.save( function (err) {
			if (err) {
				if (err.name == 'ValidationError') {
					err.http_code = 400;
				} else if (!err.http_code && err.code == 11000) {
					err.http_code = 409;
				}
				return cb(err);
			}

			cb();
		});
	});
};

postSchema.pre('validate', function (next) {
	if (!this.isModified('title')) return next();

	this.slug = slug(this.title);
	next();
});

module.exports = mongoose.model('Post', postSchema);