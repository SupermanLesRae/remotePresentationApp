var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

    res.render('index', { title: 'Investec' });
});

/* GET home page. */
router.get('/controller', function(req, res) {

    res.render('controller', { title: 'Investec Controller' });
});

module.exports = router;
