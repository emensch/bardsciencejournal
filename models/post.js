var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var postSchema = new Schema({
	title: String, 
	photo: String,
	category: String,
	type: String,
	content: String,
	authors: [{ _id: false, name: String }],
	tags: [{ _id: false, name: String }],
	edits: [{ _id: false, description: String, date: { type: Date, default: Date.now }}],
	date: { type: Date, default: Date.now }
});

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
}

postSchema.statics.updateFromBodyById = function (id, body, cb) {
	this.findById(id, function(err, post) {
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
}

module.exports = mongoose.model('Post', postSchema);