var express = require('express'),
	router = express.Router();

router.get('/', function (req, res) {
	res.send('Hello world!');
});

router.use('/posts', require('./posts'));
router.use('/categories', require('./categories'));
router.use('/types', require('./types'));
router.use('/users', require('./users'));

module.exports = router;