var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String, 
	email: String,
	password: String,
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);