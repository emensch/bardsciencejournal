var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var typeSchema = new Schema({
	name: String, 
});

typeSchema.statics.createFromBody = function (body, cb) {
	newType = new this({
		name: body.name
	});

	newType.save(cb);
};

typeSchema.statics.findByName = function (name, cb) {
	return this.find( { name:  name }, cb);
};

module.exports = mongoose.model('Type', typeSchema);