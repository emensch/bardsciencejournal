var mongoose = require('mongoose'),
	slug = require('slug'),
	Schema = mongoose.Schema;

var categorySchema = new Schema({
	name: { type: String, required: true }, 
	slug: { type: String, required: true, unique: true, index: true }
});

categorySchema.statics.findBySlug = function (slug, cb) {
	return this.findOne( { slug: slug }, cb);
};

categorySchema.statics.createFromBody = function (body, cb) {
	newCategory = new this({
		name: body.name
	});

	newCategory.save(cb);
};

categorySchema.pre('validate', function (next) {
	if (!this.isModified('name')) return next();

	this.slug = slug(this.name);
	next();
});

module.exports = mongoose.model('Category', categorySchema);