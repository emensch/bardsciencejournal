var mongoose = require('mongoose'),
	slug = require('slug'),
	Schema = mongoose.Schema;

var postSchema = new Schema({
	title: { type: String, required: true }, 
	slug: { type: String, required: true, index: { unique: true } },
	photo: { type: String, required: true },
	category: { type: String, required: true },
	type: { type: String, required: true },
	content: { type: String, required: true },
	authors: [{ _id: false, name: String }],
	tags: [{ _id: false, name: String }],
	edits: [{ _id: false, description: String, date: { type: Date, default: Date.now }}],
	date: { type: Date, default: Date.now }
});

postSchema.statics.findBySlug = function (slug, cb) {
	return this.findOne( { slug: slug }, cb);
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

	newPost.save(cb);
};

postSchema.statics.updateFromBodyBySlug = function (slug, body, cb) {
	this.findBySlug(slug, function(err, post) {
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

		post.save(cb);
	});
};

postSchema.pre('save', function (next) {
	if (!this.isModified('title')) return next();

	this.slug = slug(this.title);
	next();
});

module.exports = mongoose.model('Post', postSchema);