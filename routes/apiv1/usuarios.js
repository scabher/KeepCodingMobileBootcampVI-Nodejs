'use strict';

const express = require('express');
const router = express.Router();
const customError = require('../../lib/custom_error');
const crypto = require('crypto');
const hash = crypto.createHash('sha256');

// cargamos el modelo de Usuario
const Usuario = require('../../models/Usuario');

/**
 * Creación de un nuevo usuario
 */
router.post('/', async (req, res, next) => {
  if (!req.body.clave) {
    next(customError.getCustomError('PASSWORD_IS_MANDATORY', 'en'));
    return;
  }

  const usuarioExistente = await Usuario.findOne({ email: req.body.email }).exec();
  if (usuarioExistente) {
    next(customError.getCustomError('EMAIL_ALREADY_EXISTS', 'en'));
    return;
  }

  const usuario = new Usuario(req.body);
  usuario.clave = hash.update(usuario.clave).digest('base64');
  usuario.save((err, usuarioGuardado) => {
    if (err) {
      next(customError.getCustomError('USER_NOT_FOUND', 'en') + err);
      return;
    }

    res.json({
      sucess: true,
      result: usuarioGuardado
    });
  });
});

module.exports = router;