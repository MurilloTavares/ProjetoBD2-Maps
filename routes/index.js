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
});

router.post('/criar', function(req, res, next){
  var titulo = req.body.titulo;
  var data = new Date(req.body.data);
  var tema = req.body.tema;
  var endereco = req.body.latLng;

  // Valida dados
  req.checkBody('titulo', 'Titulo obrigatório.').notEmpty();
  req.checkBody('data', 'Data inválida.').bgThanNow();
  req.checkBody('latLng', 'Endereço inválido.').notEmpty();

  var erros = req.validationErrors();

  // Caso ha erros
  if (erros) {
    // renderiza 'criarEvento' com erros
    res.render('criarEvento', {
      title: 'Criar Evento',
      user: req.session.user,
      titulo: titulo,
      erroTitulo:   erros.find(x => x.param === 'titulo'),
      erroData:     erros.find(x => x.param === 'data'),
      erroEndereco: erros.find(x => x.param === 'latLng')
    });
  } else {
    console.log('valido');
  }
  
});

module.exports = router;
