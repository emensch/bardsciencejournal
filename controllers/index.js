var express = require('express'),
	router = express.Router(),
	bodyParser = require('body-parser'),
	errorHandler = require('../middlewares/error'),
	auth = require('../middlewares/auth');

// Enable json parsing for all requests
router.use(bodyParser.json());

// Auth test
router.get('/auth', auth, function (req, res) {
	console.log(req.user);
	res.send("Hello, Mr. Anderson.");
});

router.use('/posts', require('./posts'));
router.use('/subjects', require('./subjects'));
router.use('/types', require('./types'));
router.use('/users', require('./users'));
router.use('/user', require('./user'));
router.use('/dates', require('./dates'));

router.use(errorHandler);

module.exports = router;