var express = require('express'),
	router = express.Router();

router.get('/', function (req, res) {
	res.send('Types');
});

module.exports = router