var mongoose = require('mongoose'),
	slug = require('slug'),
	Schema = mongoose.Schema;

var typeSchema = new Schema({
	name: { type: String, required: true }, 
	slug: { type: String, required: true, index: { unique: true } }
});

typeSchema.statics.findBySlug = function (slug, cb) {
	return this.findOne( { slug: slug }, cb);
};

typeSchema.statics.createFromBody = function (body, cb) {
	newType = new this({
		name: body.name
	});

	newType.save(cb);
};

typeSchema.pre('save', function (next) {
	if (!this.isModified('name')) return next();

	this.slug = slug(this.name);
	next();
});

module.exports = mongoose.model('Type', typeSchema);