var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var categorySchema = new Schema({
	name: String, 
});

module.exports = mongoose.model('Category', categorySchema);