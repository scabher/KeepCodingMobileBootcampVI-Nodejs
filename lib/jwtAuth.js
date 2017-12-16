'use strict';

const customError = require('./custom_error');
const jwt = require('jsonwebtoken');

// exportamos un creador de middlewares de autenticación
module.exports = () => {
  return function(req, res, next) {
    // leer credenciales
    const token = req.body.token || req.query.token || req.get('x-access-token');
    const lang = req.query.lang;

    if (!token) {
      const err = customError.getCustomError('AUTH_TOKEN_NOT_PROVIDED', lang);
      err.status = 401;
      
      return next(err);
    }

    // comprobar credenciales
    // puede ser síncrona (const decoded = ...), esta forma es asíncrona
    const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err) {
        const err = customError.getCustomError('AUTH_TOKEN_INVALID', lang);
        err.status = 401;
        return next(err);
      }
      // continuar
      req.userId = decoded.user_id; // para pasárselo al resto de middlewares
      next();
    }); 
  }
}