var sendgrid = require('sendgrid')(process.env.SENDGRID_APIKEY);

var fromAddr = 'noreply@bsj.bard.edu'

module.exports.sendResetEmail = function (email, token, cb) {
	var payload = {
		to: email,
		from: fromAddr,
		subject: 'BSJ Password Reset',
		text: token
	}

	sendgrid.send(payload, cb);
}