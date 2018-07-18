var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res){
  res.render('login', { title : 'Log in'});
});

router.get('/cadastrar', function(req, res){
  res.render('cadastrar', { title : 'Cadastrar'});
});

module.exports = router;
