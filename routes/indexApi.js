var express = require('express');
var router = express.Router();
var favoritepets = require('../controllers/petApi');

router.get('/favoritepets', favoritepets.allPets);
router.get('/favoritepets/:favoritepetid', favoritepets.getPet);

module.exports = router;