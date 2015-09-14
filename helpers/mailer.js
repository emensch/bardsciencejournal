var sendgrid = require('sendgrid')(process.env.SENDGRID_APIKEY);

var fromAddr = 'noreply@bsj.bard.edu'

module.exports.sendResetEmail = function (email, username, token, cb) {
	var payload = {
		to: email,
		from: fromAddr,
		subject: 'BSJ Password Reset',
		text: 'admin/resetpassword?username='+username+'&token='+token 
	}

	sendgrid.send(payload, cb);
}