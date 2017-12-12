'use strict';

const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
  nombre: { type: String, index: true },
  email: { type: String, index: true }, 
  clave: String
});

const usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = usuario;