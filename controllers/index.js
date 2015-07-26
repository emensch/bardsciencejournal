var express = require('express'),
	router = express.Router(),
	bodyParser = require('body-parser'),
	errorHandler = require('../middlewares/error'),
	auth = require('../middlewares/auth');

// Enable json parsing for all requests
router.use(bodyParser.json());

router.get('/', function (req, res) {
	res.send('BSJ');
});

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

router.use(errorHandler);

module.exports = router;