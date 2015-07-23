module.exports = function (err, req, res, next) {
	if (err.http_code) {
		res.sendStatus(err.http_code);
	} else {
		res.sendStatus(500);
		console.error(err);
	}
}