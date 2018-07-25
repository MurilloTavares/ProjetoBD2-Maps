const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mapsdb',  { useNewUrlParser: true });
var db = mongoose.connection;

const bcrypt = require('bcryptjs');

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
    inst:  { type: String }
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(newUser, callback){
    bcrypt.hash(newUser.senha, 10, function(err, hash){
        if(err) throw err;
        newUser.senha = hash;
        newUser.save(callback);
    });
};

module.exports.getUserByEmail = function(email, callback){
    User.findOne({email: email}, callback);
};

module.exports.compararSenha = function(senhaCandidata, hash, callback){
    bcrypt.compare(senhaCandidata, hash, function(err, isMatch){
        if(err) return callback(err);
        callback(null, isMatch);
    });
};
