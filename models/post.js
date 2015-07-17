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

module.exports = mongoose.model('Post', postSchema);