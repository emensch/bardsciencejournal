var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var categorySchema = new Schema({
	name: String, 
});

categorySchema.statics.createFromBody = function (body, cb) {
	newCategory = new this({
		name: body.name
	});

	newCategory.save(cb);
};

categorySchema.statics.findByName = function (name, cb) {
	return this.find( { name:  name }, cb);
};

module.exports = mongoose.model('Category', categorySchema);