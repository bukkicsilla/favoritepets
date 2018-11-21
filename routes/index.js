var express = require('express');
var passport = require('passport');  
var router = express.Router();
var petController = require('../controllers/pet');
var resetController = require('../controllers/reset');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Do you have favorite pets?' });
});

router.get('/pets', isLoggedIn, petController.getPets);
router.get('/pet/:favoritepetid', isLoggedIn, petController.getPet);
router.get('/createpet', petController.formCreatePet);
router.post('/createpet', petController.createPet);
router.get('/deletepet/:favoritepetid', petController.deletePet);
router.get('/updatedescription/:favoritepetid', petController.formUpdatePet);
router.post('/updatedescription/:favoritepetid', petController.updatePet);


router.get('/forgot', function(req, res) {
  res.render('forgot', {
    user: req.user,
    message: req.flash('resetPassword')
  });
});

router.post('/forgot', resetController.forgotPassword);

router.get('/reset/:token', resetController.useToken);
router.post('/reset/:token', resetController.resetPassword);//??????

router.get('/login', function(req, res, next) {  
  res.render('login', { title: 'Login', message: req.flash('loginMessage') });
});

router.get('/signup', function(req, res) {  
  res.render('signup', { title: 'Signup', message: req.flash('signupMessage') });
});

router.get('/logout', function(req, res) {  
  req.logout();
  res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {  
  successRedirect: '/pets',
  failureRedirect: '/signup',
  failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {  
  successRedirect: '/pets',
  failureRedirect: '/login',
  failureFlash: true,
}));

function isLoggedIn(req, res, next) { 
  if (req.isAuthenticated()){
      next();
  }
  else{
  res.redirect('/login');
  }
}
module.exports = router;
