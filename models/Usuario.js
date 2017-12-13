'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const usuarioSchema = mongoose.Schema({
  nombre: { type: String, index: true },
  email: { type: String, index: true }, 
  clave: String
});

const usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = usuario;