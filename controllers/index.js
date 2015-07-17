var express = require('express'),
	router = express.Router(),
	bodyParser = require('body-parser');

// Enable json parsing for all requests
router.use(bodyParser.json());

router.get('/', function (req, res) {
	res.send('BSJ');
});

router.use('/posts', require('./posts'));
router.use('/categories', require('./categories'));
router.use('/types', require('./types'));
router.use('/users', require('./users'));

module.exports = router;