#!/usr/bin/env node

// Modelos de Mongoose
const Anuncio = require('../models/Anuncio');
const Usuario = require('../models/Usuario');

const saveHandler = (err, datosGuardados) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('datosGuardados', datosGuardados);
}

function initializeAnuncios() {
  console.log('Eliminando todos los anuncios existentes...');
  const removed = Anuncio.remove({}).exec();
  removed.then((eliminados) => {
    console.log('Se han eliminado correctamente todos los anuncios');

    console.log('Creando nuevos anuncios...');
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

  }).catch((error) => {
    console.log('Se ha producido un error eliminando todos los anuncios: ', error);
  });
}

// async function initializeUsuarios() {
//   try {
//     console.log('Eliminando todos los usuarios existentes...');
//     await Usuario.remove({}).exec();
//     console.log('Se han eliminado correctamente todos los usuarios');
//   } catch (error) {
//     console.log('Se ha producido un error eliminando todos los usuarios: ', error);
//   }

//   // Creación de 2 usuarios
//   const usuario1 = new Usuario({
//     nombre: 'Usuario 1',
//     email: 'usuario1@gmail.com',
//     clave: 'usuario1Clave'
//   });

//   usuario1.save(saveHandler); 

//   const usuario2 = new Usuario({
//     nombre: 'Usuario 2',
//     email: 'usuario2@gmail.com',
//     clave: 'usuario2Clave'
//   });

//   usuario2.save(saveHandler); 
// }

initializeAnuncios();
// initializeUsuarios();



