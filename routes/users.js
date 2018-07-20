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
  var inst = req.body.inst;

  // Valida dados
  req.checkBody('email', 'Email inválido.').isEmail();
  req.checkBody('nome', 'Nome deve conter entre 4 e 50 caracteres.').isLength({min: 4, max: 50});
  req.checkBody('curso', 'Curso deve conter menos de 50 caracteres.').isLength({max: 50});
  req.checkBody('inst', 'Instituicao deve conter menos de 50 caracteres.').isLength({max: 50});
  req.checkBody('senha', 'Senha deve conter entre 4 e 50 caracteres.').isLength({min: 4, max: 50});
  req.checkBody('senha2', 'As senhas não são iguais.').equals(senha);
  var erros = req.validationErrors();

  // Caso ha erros
  if (erros) {
    // renderiza 'cadastrar' com erros
    res.render('cadastrar', {
      title: 'Cadastrar',
      email: email,
      nome: nome,
      curso: curso,
      inst: inst,
      erroEmail: erros.find(x => x.param === 'email'),
      erroNome:  erros.find(x => x.param === 'nome'),
      erroCurso: erros.find(x => x.param === 'curso'),
      erroInst:  erros.find(x => x.param === 'inst'),
      erroSenha: erros.find(x => x.param === 'senha'),
      erroSenha2:erros.find(x => x.param === 'senha2')      
    });

  }else{
    // Instancia novo usuario
    var newUser = new User({
      email: email,
      nome: nome,
      senha: senha,
      curso: curso,
      inst: inst
    });

    // Cria usuario
    User.createUser( newUser, function(err, user){
      if(err) throw err;
      // Caso sucesso, imprime user no console
      console.log(user);
    });

    res.location('/');
    res.redirect('/');
  }
});

module.exports = router;
