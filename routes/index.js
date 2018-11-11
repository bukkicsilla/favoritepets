var express = require('express');
var router = express.Router();
var petController = require('../controllers/pet');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Do you have favorite pets?' });
});*/

router.get('/pets', petController.getPets);
module.exports = router;
