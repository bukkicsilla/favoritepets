var express = require('express');
var router = express.Router();
var petController = require('../controllers/pet');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Do you have favorite pets?' });
});

router.get('/pets', petController.getPets);
router.get('/pet/:favoritepetid', petController.getPet);
router.get('/createpet', petController.formCreatePet);
router.post('/createpet', petController.createPet);
router.get('/deletepet/:favoritepetid', petController.deletePet);
router.get('/updatedescription/:favoritepetid', petController.formUpdateDescription);
router.post('/updatedescription/:favoritepetid', petController.updateDescription);

module.exports = router;
