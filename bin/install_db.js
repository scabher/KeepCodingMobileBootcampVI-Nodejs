#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('../lib/connect_mongoose');

// Modelos de Mongoose
const Anuncio = require('../models/Anuncio');
const Usuario = require('../models/Usuario');


const saveHandler = (err, datosGuardados) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('datosGuardados', datosGuardados);
}

// Creación de una colección de anuncios
for (let i = 0; i < 100; i++) {
  const tags = [];
  if (i%2 == 0) tags.push('work');
  if (i%3 == 0) tags.push('lifestyle');
  if (i%4 == 0) tags.push('motor');
  if (i%5 == 0) tags.push('mobile');
  if (!tags.length) tags.push('mobile')
  
  const anuncio = new Anuncio({
    nombre: 'Anuncio' + i,
    venta: i%2 == 0, 
    precio: Math.floor(Math.random() * 5000) + 1, 
    foto: null, 
    tags: tags
  });

  anuncio.save(saveHandler);  
}


// Creación de 2 usuarios
const usuario1 = new Usuario({
  nombre: 'Usuario 1',
  email: 'usuario1@gmail.com',
  clave: 'usuario1Clave'
});

usuario1.save(saveHandler); 

const usuario2 = new Usuario({
  nombre: 'Usuario 2',
  email: 'usuario2@gmail.com',
  clave: 'usuario2Clave'
});

usuario2.save(saveHandler); 
