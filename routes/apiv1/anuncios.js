'use strict';

const express = require('express');
const router = express.Router();
const { query, body, validationResult } = require('express-validator/check');

const jwtAuth = require('../../lib/jwtAuth');
const Anuncio = require('../../models/Anuncio');
const customError = require('../../lib/custom_error');

// Debe contener token de validación para todo el router
router.use(jwtAuth());

/**
 * GET /anuncio
 * Obtener una lista de anuncios
 */
router.get('/', [
  query('venta').optional().isBoolean().withMessage('WRONG_FOR_SALE'),
  query('precioMin').optional().isDecimal().withMessage('WRONG_MIN_PRICE'),
  query('precioMax').optional().isDecimal().withMessage('WRONG_MAX_PRICE'),
  query('start').optional().isInt().withMessage('WRONG_START_INDEX'),
  query('limit').optional().isInt().withMessage('WRONG_START_INDEX'),
  query('includeTotal').optional().isBoolean().withMessage('WRONG_TOTAL_COUNT'),
], async(req, res, next) => {
  try{
    const lang = req.query.lang || 'en';
    const errors = customError.setCustomErrorForValidation(validationResult(req), lang);
    
    if (!errors.isEmpty()) {
      res.status(422);
      next(errors);
      return;    
    }

    const filter = buildFilter(req.query);
    let totalCount = 0;
    let result = {};

    if (req.query.includeTotal == 'true') { 
      totalCount = await Anuncio.find(filter).count().exec();
      result.total = totalCount;
    }

    let query = Anuncio.find(filter); 
    if (req.query.start) { query = query.skip(parseInt (req.query.start)); }
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
 * POST /anuncio
 * Creación de un nuevo anuncio
 */
router.post('/', [
  body('nombre').not().isEmpty().withMessage('ADV_WRONG_NAME'),
  body('venta').isBoolean().withMessage('ADV_WRONG_FOR_SALE'),
  body('precio').isDecimal().withMessage('ADV_WRONG_PRICE')
], (req, res, next) => {
  const lang = req.query.lang || 'en';
  const errors = customError.setCustomErrorForValidation(validationResult(req), lang);
  
  if (!errors.isEmpty()) {
    res.status(422);
    next(errors);
    return;    
  }
  
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


/**
 * GET /anuncio/tagList
 * Obtener la lista de tags
 */
router.get('/tagList', async(req, res, next) => {
  try{
    const lang = req.query.lang || 'en';

    res.json({
      sucess: true,
      result: ['work', 'lifestyle', 'motor', 'mobile', 'mobile']
    });
  }
  catch (error) {
    next(error);
  }
});

const buildFilter = (params) => {
  const tag = params.tag;
  const venta = params.venta;
  const nombre = params.nombre;
  const precioMin = parseInt(params.precioMin);
  const precioMax = parseInt(params.precioMax);

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