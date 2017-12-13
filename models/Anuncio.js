'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const anuncioSchema = mongoose.Schema({
  nombre: { type: String, index: true },
  venta: { type: Boolean, index: true }, 
  precio: { type: Number, index: true }, 
  foto: String, 
  tags: { type: [String], index: true }
});

const anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = anuncio;