var express = require('express'),
	router = express.Router(),
	bodyParser = require('body-parser'),
	auth = require('../middlewares/auth');

// Enable json parsing for all requests
router.use(bodyParser.json());

router.get('/', function (req, res) {
	res.send('BSJ');
});

// Auth test
router.get('/auth', auth, function (req, res) {
	res.send("Hello, Mr. Anderson.")
});

router.use('/posts', require('./posts'));
router.use('/categories', require('./categories'));
router.use('/types', require('./types'));
router.use('/users', require('./users'));

module.exports = router;