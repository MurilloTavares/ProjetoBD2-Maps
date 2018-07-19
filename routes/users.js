var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET users listing. */
router.get('/login', function(req, res){
  res.render('login', { title : 'Log in'});
});

router.get('/cadastrar', function(req, res){
  res.render('cadastrar', { title : 'Cadastrar'});
});

router.post('/cadastrar', function(req,res){
  // Pega dados do formulario
  var email = req.body.email;
  var nome = req.body.nome;
  var senha = req.body.senha;
  var curso = req.body.curso;
  var instituicao = req.body.instituicao;

  // Instancia novo usuario
  var newUser = new User({
    email: email,
    nome: nome,
    senha: senha,
    curso: curso,
    instituicao: instituicao
  });

  // Cria usuario
  User.createUser( newUser, function(err, user){
    if(err) throw err;
    // Caso sucesso, imprime user no console
    console.log(user);
  });

  res.location('/');
  res.redirect('/');
});

module.exports = router;
