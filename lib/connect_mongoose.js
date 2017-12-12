'use strict';

const mongoose = require('mongoose');
const mongooseConn = mongoose.connection;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27020/PracticaNodeJs', {
  useMongoClient: true
});

mongooseConn.on('error', (err) => {
  console.log('Error:', err);
  process.exit(1);
});

mongooseConn.once('open', () => {
  console.log(`Conectado a la base de datos en ${mongoose.connection.name}`);
});

module.exports = mongooseConn;

