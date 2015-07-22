module.exports = function (err, req, res, next) {
	res.sendStatus(500);
	console.error(err.stack);
}