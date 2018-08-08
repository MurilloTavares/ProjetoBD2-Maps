const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mapsdb', { useNewUrlParser: true });
var db = mongoose.connection;

// Evento schema
var eventoSchema = mongoose.Schema({
    titulo: { type: String },
    data: { type: Date },
    tema: { type: String },
    endereco: { type: String },
});

var Evento = module.exports = mongoose.model('Evento', eventoSchema);

module.exports.saveEvento = function (newEvento, callback) {
    newEvento.save(callback);
};
