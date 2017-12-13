'use strict';

const express = require('express');
const router = express.Router();

// cargamos el modelo de Anuncio
const Anuncio = require('../../models/Anuncio');


/**
 * GET /anuncio
 * Obtener una lista de anuncios
 */
router.get('/', async(req, res, next) => {
  try{
    const name = req.query.name;
    const age = req.query.age;
    const limit = parseInt(req.query.limit); // Number(str)
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort;
    const fields = req.query.fields;

    const filter = {};

    const anuncios = await Anuncio.find(filter).exec();
    res.json({
      sucess: true,
      result: anuncios
    });
  }
  catch (error) {
    next(error);
  }
});


/**
 * Creación de un nuevo anuncio
 */
router.post('/', (req, res, next) => {
  const anuncio = new Anuncio(req.body);

  anuncio.save((err, anuncioGuardado) => {
    if (err) {
      next(err);
      return;
    }

    res.json({
      sucess: true,
      result: anuncioGuardado
    });
  });
});

module.exports = router;