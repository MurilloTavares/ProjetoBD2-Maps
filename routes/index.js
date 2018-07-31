var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.authenticated){
    res.render('index', {
      title: 'Home',
      user: req.session.user});
  }
  res.redirect('/users/login');  
});

router.get('/criar', function(req, res, next){
  if(req.session.authenticated){
    res.render('criarEvento', {
      title: 'Criar Evento',
      user: req.session.user});
  }
  res.redirect('/users/login');
})

module.exports = router;
