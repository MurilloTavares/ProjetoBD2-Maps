const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mapsdb',  { useNewUrlParser: true });
var db = mongoose.connection;

// Testar conexao
/*
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connectado ao banco.')
});*/

// User schema
var userSchema = mongoose.Schema({
    email: { type: String, index: true },
    nome:  { type: String },
    senha: { type: String },
    curso: { type: String },
    instituicao:{ type: String }
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(newUser, callback){
    newUser.save(callback);
};
