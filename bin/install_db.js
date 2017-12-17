#!/usr/bin/env node

const mongooseConn = require('../lib/connect_mongoose');
const crypto = require('crypto');

// Modelos de Mongoose
const Anuncio = require('../models/Anuncio');
const Usuario = require('../models/Usuario');

mongooseConn.on('open', async () => {
  await initializeAnuncios();
  await initializeUsuarios();
  mongooseConn.close();
});

async function initializeAnuncios() {
  try {
    console.log('\n\nInicializando anuncios...');

    await Anuncio.collection.remove();
    console.log('Se han eliminado correctamente todos los anuncios');

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
        foto: `images/anuncios/img${i}.jpg`, 
        tags: tags
      });
  
      const nuevoAnuncio = await anuncio.save();
      console.log (`${ i } - Id. nuevo anuncio: `, nuevoAnuncio._id);  
    }
  }
  catch(error) {
    console.log('Se ha producido un error al inicializar los anuncios: ', error);
  };
}

async function initializeUsuarios() {
  try {
    console.log('\n\nInicializando usuarios...');
    await Usuario.collection.remove();
    console.log('Se han eliminado correctamente todos los usuarios');
    
    let hash = crypto.createHash('sha256');
    const usuario1 = new Usuario({
      nombre: 'Usuario 1',
      email: 'usuario1@gmail.com',
      clave: hash.update('usuario1Clave').digest('base64')
    });

    let nuevoUsuario = await usuario1.save();
    console.log ('Nuevo usuario creado: ', nuevoUsuario.email);

    hash = crypto.createHash('sha256');
    const usuario2 = new Usuario({
      nombre: 'Usuario 2',
      email: 'usuario2@gmail.com',
      clave: hash.update('usuario2Clave').digest('base64')
    });

    nuevoUsuario = await usuario2.save(); 
    console.log ('Nuevo usuario creado: ', nuevoUsuario.email);
  } catch (error) {
    console.log('Se ha producido un error al inicializar los usuarios: ', error);
  }
    
}



