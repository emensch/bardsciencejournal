var mongoose = require('mongoose'),
	slug = require('slug'),
	errors = require('../helpers/modelerrors'),
	Schema = mongoose.Schema;

var postSchema = new Schema({
	title: { type: String, required: true }, 
	slug: { type: String, required: true },
	photo: { type: String, required: true },
	subject: { type: String, required: true },
	type: { type: String, required: true },
	content: { type: String, required: true },
	authors: [String],
	tags: [String],
	edits: [{ _id: false, 
		description: { type: String, required: true }, 
		date: { type: Date, default: Date.now }}],
	date: { type: Date, default: Date.now }
});

postSchema.index({ slug: 1 }, { unique: true });
postSchema.index({ subject: 1 });
postSchema.index({ type: 1 });
postSchema.index({ authors: 1 });
postSchema.index({ tags: 1 });
//Text search index
postSchema.index({
	title: 'text',
	content: 'text',
	authors: 'text',
	tags: 'text'
},
{
	name: 'textsearch_idx'
});

postSchema.statics.findWithQuery = function (query, cb) {
	var subject = query.subject;
	var type = query.type;
	var author = query.author;
	var tag = query.tag;
	var search = query.search;
	var page = query.page || 1;
	var queryObj = {};
	var sortObj = {};
	var metaObj = {};

	// Build query object
	// If search is present, exclude other query params
	if (search) {
		queryObj = { $text: { $search: search } };
		metaObj = { score: { $meta: 'textScore' } };
		sortObj = { score: { $meta: 'textScore' } };
	} else {
		if (subject) queryObj.subject = subject;
		if (type) queryObj.type = type;
		if (author) queryObj.authors = author;
		if (tag) queryObj.tags = tag; 
		sortObj = { date: -1 };
	}

	this.find(queryObj, metaObj)
	.select('-_id -__v')
	.skip((page - 1) * 10)
	.limit(10)
	.sort(sortObj)
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
		subject: body.subject,
		type: body.type,
		content: body.content,
	});

	newPost.authors = body.authors;
	newPost.tags = body.tags;

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
		post.subject = body.subject;
		post.type = body.type;
		post.content = body.content;
		post.edits.push({ description: body.description });

		post.authors = body.authors;
		post.tags = body.tags;

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