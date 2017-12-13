'use strict';

const jwt = require('jsonwebtoken');

// exportamos un creador de middlewares de autenticación
module.exports = () => {
  return function(req, res, next) {
    // leer credenciales
    const token = req.body.token || req.query.token || req.get('x-access-token');

    if (!token) {
      const err = new Error('No token provided');
      err.status = 401;
      next(err);
      return;
    }

    // comprobar credenciales
    // puede ser síncrona (const decoded = ...), esta forma es asíncrona
    const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err) {
        console.log('Token error:', error);
        const error = new Error('Invalid token');
        error.status = 401;
        next(error);
        return;
      }
      // continuar
      req.userId = decoded.user_id; // para pasárselo al resto de middlewares
      next();
    }); 
  }
}