'use strict';

const fs = require('fs');

let customErrors = null;

/**
 * Carga en memoria la lista de errores desde un fichero json
 */
const loadCustomErrors = () => {
  try {
    const data = fs.readFileSync(__dirname + '/../resources/customErrors.json');
    customErrors = JSON.parse(data);
    return customErrors;
  } catch (error) {
    console.error('Se ha producido un error al leer el fichero json de errores: ', error);
  }
}

const findCustomError = (errorList, token, lang) => {
  for (let i = 0; i < errorList.length; i++) {
    const translation = errorList[i];
    
    if (translation.token == token) {
      if (translation[lang]){
        return translation[lang];
      }
      else {
        return 'Idioma no soportado';
      }
    }
  }
  return 'Token de traducción no encontrado'
}

/**
 * Devuelve el texto del mensaje de error en el idioma indicado
 * @param {*} token Identificador del mensaje de error
 * @param {*} lang Idioma del mensaje
 */
const getCustomError = (token, lang) => {
  if (!customErrors) {
    console.log('Cargando lista de errores...');
    loadCustomErrors();
  }
  return findCustomError(customErrors, token, lang) + ': ';
}

module.exports.getCustomError = getCustomError;
module.exports.loadCustomErrors = loadCustomErrors;
module.exports.customErrors = customErrors;