'use strict';

const express = require('express');
const router = express.Router();

// cargamos el modelo de Anuncio
const Anuncio = require('../../models/Anuncio');

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