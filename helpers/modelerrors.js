module.exports.parseSaveError = function(err) {
	if (err.name == 'ValidationError') {
		err.http_code = 400;
	} else if (!err.http_code && err.code == 11000) {
		err.http_code = 409;
	}
}

module.exports.notFound = function() {
	var err = new Error();
	err.http_code = 404;
	return err;
}

module.exports.badRequest = function() {
	var err = new Error();
	err.http_code = 400;
	return err;
}