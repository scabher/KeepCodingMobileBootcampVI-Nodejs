'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
  // recogemos las redenciales
  const email = req.body.email;
  const password = req.body.password;

  // buscamos en la BBDD el usuario
  // ...
  // simulamos que buscamos
  if (email !== 'user@example.com' || password !== '1234') {
    res.status = 401;
    res.json({ error: 'Credenciales incorrectas'});
    return;
  }
  const user = { _id: 'bbdd_user_id' };

  // si el usuario existe y el password coindice
  // creamos un token 
  // no firmar objetos de mongoose porque no se pueden poner propiedades adiciones.
  // usar mejor un nuevo objeto sólo con lo mínimo
  jwt.sign({ user_id: user._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  }, (err, token) => {
    if (err) {
      return next(err); // == next(err); return;
    }

    // y lo devolvemos
    res.json({ sucess: true, token: token});
  });
});

module.exports = router;
