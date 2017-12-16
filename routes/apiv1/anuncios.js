'use strict';

const express = require('express');
const router = express.Router();
const jwtAuth = require('../../lib/jwtAuth');
const Anuncio = require('../../models/Anuncio');

// Debe contener token de validación para todo el router
//router.use(jwtAuth());

/**
 * GET /anuncio
 * Obtener una lista de anuncios
 */
router.get('/', async(req, res, next) => {
  try{
    const filter = buildFilter(req.query);
    let totalCount = 0;
    let result = {};

    if (req.query.includeTotal == 'true') { 
      totalCount = await Anuncio.find(filter).count().exec();
      result.total = totalCount;
    }

    let query = Anuncio.find(filter); 
    if (req.query.limit) { query = query.limit(parseInt (req.query.limit)); }
    if (req.query.sort) { query = query.sort(req.query.sort); }

    const anuncios = await query.exec();

    result.sucess = true;
    result.result = anuncios;
    res.json(result);
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


const buildFilter = (params) => {
  const tag = params.tag;
  const venta = params.venta;
  const nombre = params.nombre;
  const precioMin = parseInt(params.precioMin);
  const precioMax = parseInt(params.precioMax);
  const start = parseInt(params.start);

  const filter = {};

  if (tag) { filter.tags = { $in: [tag] }; }
  if (venta) { filter.venta = venta; }
  if (nombre) { filter.nombre = new RegExp('^' + nombre, 'ig'); }
  if (precioMin) { filter.precio = { $gte: precioMin }; }
  if (precioMax) { 
    if (!precioMin) 
      filter.precio = { $lte: precioMax };
    else
      filter.precio.$lte = precioMax;
  }
  return filter;
}

module.exports = router;