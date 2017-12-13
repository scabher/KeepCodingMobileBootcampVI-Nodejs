'use strict';

const express = require('express');
const router = express.Router();

// cargamos el modelo de Usuario
const Usuario = require('../../models/Usuario');

/**
 * Creación de un nuevo usuario
 */
router.post('/', (req, res, next) => {
  const usuario = new Usuario(req.body);

  usuario.save((err, usuarioGuardado) => {
    if (err) {
      next(err);
      return;
    }

    res.json({
      sucess: true,
      result: usuarioGuardado
    });
  });
});

module.exports = router;