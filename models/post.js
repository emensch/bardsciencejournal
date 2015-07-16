var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var postSchema = new Schema({
	title: String, 
	photo: String,
	category: String,
	type: String,
	content: String,
	authors: [{ name: String }],
	tags: [{ name: String }],
	edits: [{ description: String, date: Date }],
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);