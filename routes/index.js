var express = require('express');
var router = express.Router();

var Evento = require('../models/evento');

/* GET home page. */
router.get('/', function (req, res, next) {

  // Busca eventos
  Evento.find({}).exec((err, result) => {

    if (err) {
      console.log(err);
      res.redirect('/users/login');
    } else {

      if (req.session.authenticated) {

        res.render('index', {
          title: 'Home',
          user: req.session.user,
          eventos: result
        });

      } else {
        res.redirect('/users/login');
      }
    }

  })

});

router.get('/criar', function (req, res, next) {

  // Busca eventos
  Evento.find({}).exec((err, result) => {

    if (err) {
      console.log(err);
      res.redirect('/users/login');
    } else {

      if (req.session.authenticated) {

        res.render('criarEvento', {
          title: 'Criar Evento',
          user: req.session.user,
          eventos: result
        });

      } else {
        res.redirect('/users/login');
      }
    }

  })

});

router.post('/criar', function (req, res, next) {
  var titulo = req.body.titulo;
  var data = req.body.data;
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
     // Busca eventos
    Evento.find({}).exec((err, result) => {
      res.render('criarEvento', {
        title: 'Criar Evento',
        user: req.session.user,
        titulo: titulo,
        eventos: result,
        erroTitulo: erros.find(x => x.param === 'titulo'),
        erroData: erros.find(x => x.param === 'data'),
        erroEndereco: erros.find(x => x.param === 'latLng')
      });
    });
  } else {
    // Instancia novo Evento
    var novoEvento = new Evento({
      titulo: titulo,
      data: data,
      tema: tema,
      endereco: endereco
    });

    // Salva no banco
    Evento.saveEvento(novoEvento, function (err, evento) {
      if (err) throw err;
      console.log('novo evento: ' + evento);
    });

    res.location('/');
    res.redirect('/');
  }
});

module.exports = router;
