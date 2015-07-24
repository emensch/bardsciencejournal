var mongoose = require('mongoose'),
	slug = require('slug'),
	errors = require('../helpers/modelerrors'),
	Schema = mongoose.Schema;

var postSchema = new Schema({
	title: { type: String, required: true }, 
	slug: { type: String, required: true },
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

postSchema.index({ slug: 1 }, { unique: true });
postSchema.index({ category: 1 });
postSchema.index({ type: 1 });

postSchema.statics.findAll = function (cb) {
	this.find({})
	.select('-_id -__v')
	.exec( function (err, post) {
		if (err) {
			return cb(err);
		}

		cb(null, post);
	});
};

postSchema.statics.findBySlug = function (slug, cb) {
	this.findOne({ slug: slug })
	.select('-_id -__v')
	.exec( function (err, post) {
		if (err) {
			return cb(err);
		}

		if(!post) {
			err = errors.notFound();
			return cb(err);
		}

		cb(null, post);
	});
};

postSchema.statics.deleteBySlug = function (slug, cb) {
	this.findOneAndRemove({ slug: slug }, function (err, post) {
		if (err) {
			return cb(err);
		}

		if(!post) {
			err = errors.notFound();
			return cb(err);
		}

		cb(null, err);
	});
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
			errors.parseSaveError(err);
			return cb(err);
		}

		cb();
	});
};

postSchema.statics.updateFromBodyBySlug = function (slug, body, cb) {
	this.findOne({ slug: slug }, function (err, post) {
		if (err) {
			return cb(err);
		}
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
				errors.parseSaveError(err);
				return cb(err);
			}

			cb();
		});
	});
};

// Ensure photo is a valid url
postSchema.path('photo').validate( function (photo) {
	var regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
	return regex.test(photo);
});

postSchema.pre('validate', function (next) {
	if (!this.isModified('title')) return next();

	if (!this.title) {
		err = errors.badRequest();
		return next(err);
	}

	this.slug = slug(this.title);
	next();
});

module.exports = mongoose.model('Post', postSchema);