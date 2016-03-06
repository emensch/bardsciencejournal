var mongoose = require('mongoose'),
	slug = require('slug'),
	errors = require('../helpers/modelerrors'),
	Schema = mongoose.Schema;

var postSchema = new Schema({
	title: { type: String, required: true }, 
	slug: { type: String, required: true },
	photo: { type: String, required: true },
	subject: { type: String, required: true, lowercase: true, trim: true },
	type: { type: String, required: true, lowercase: true, trim: true },
	description: { type: String, required: true},
	content: { type: String, required: true },
	authors: [{ type: String, lowercase: true, trim: true }],
	tags: [{ type: String, lowercase: true, trim: true }],
	edits: [{ _id: false, 
		reason: { type: String },
		date: { type: Date, default: Date.now }}],
	date: { type: Date, default: Date.now },
	featured: { type: Boolean, default: false }
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
	subject: 'text',
	type: 'text',
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
	var featured = query.featured;
	var search = query.search;
	var startDate = query.from;
	var endDate = query.to;
	var page = query.page || 1;
	var num = Math.min((query.num || 10), 10);
	var queryObj = {};
	var dateObj = {};
	var sortObj = {};
	var metaObj = {};

	// Build query object
	// If search is present, exclude other query params
	if (search) {
		queryObj = { $text: { $search: search } };
		metaObj = { score: { $meta: 'textScore' } };
		sortObj = { score: { $meta: 'textScore' } };
	} else {
		if (subject) queryObj.subject = subject.toLowerCase();
		if (type) queryObj.type = type.toLowerCase();
		if (author) queryObj.authors = author.toLowerCase(); 
		if (tag) queryObj.tags = tag.toLowerCase(); 
		if (featured) queryObj.featured = featured;

		if (startDate || endDate) {
			if (startDate) dateObj.$gte = new Date(startDate);
			if (endDate) dateObj.$lte = new Date(endDate);
			queryObj.date = dateObj;
		}

		sortObj = { date: -1 };
	}

	var Post = this;

	Post.find(queryObj, metaObj)
	.select('-_id -__v -content')
	.skip((page - 1) * num)
	.limit(num)
	.sort(sortObj)
	.exec( function (err, posts) {
		if (err) {
			return cb(err);
		}

		Post.count(queryObj, function (err, count) {
			if (err) {
				return cb(err);
			}

			var results = {
				pages: Math.ceil(count / num),
				posts: posts
			};
			
			cb(null, results);
		});
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

postSchema.statics.createFromReq = function (req, cb) {
	var body = req.body;
	newPost = new this({
		title: body.title,
		photo: body.photourl,
		subject: body.subject,
		type: body.type,
		description: body.description, 
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

postSchema.statics.updateFromReq = function (req, cb) {
	var slug = req.params.slug;
	var body = req.body;
	this.findOne({ slug: slug }, function (err, post) {
		if (err) {
			return cb(err);
		}

		if (!post) {
			err = errors.notFound();
			return cb(err);
		}

		post.title = body.title || post.title;
		post.photo = body.photo || post.photo;
		post.subject = body.subject || post.subject;
		post.type = body.type || post.type;
		post.description = body.description || post.description;
		post.content = body.content || post.content;
		if(body.reason) {
			post.edits.push({reason: body.reason});
		}
		post.authors = body.authors || post.authors;
		post.tags = body.tags || post.tags;
		post.featured = (typeof body.featured !== 'undefined') ? body.featured : post.featured;

		post.save( function (err) {
			if (err) {
				console.log(err);
				errors.parseSaveError(err);
				return cb(err);
			}

			cb();
		});
	});
};

postSchema.statics.getDates = function (cb) {
	var Post = this;

	Post.findOne()
	.select('date')
	.sort({date: 1})
	.limit(1)
	.exec( function (err, first) {
		if (err) {
			return cb(err);
		}

		if(!first) {
			err = errors.notFound();
			return cb(err);
		}

		Post.findOne()
		.select('date')
		.sort({date: -1})
		.limit(1)
		.exec( function (err, last) {
			if (err) {
				return cb(err);
			}

			console.log(last);
			var dates = {
				first: first.date,
				last: last.date
			};

			cb(null, dates);
		});
	});
};

// Ensure photo is a valid url
postSchema.path('photo').validate( function (photo) {
	var regex = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/i
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