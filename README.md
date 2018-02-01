# VIMobileBootCamp_Devops
Ruta de acceso a imagen estática: http://ec2-54-196-56-16.compute-1.amazonaws.com/images/logo.jpg
Ruta de acceso a plantilla de https://startbootstrap.com: http://54.196.56.16


# VIMobileBootCamp_Nodejs
Práctica de Nodejs para el VI Mobile BootCamp de KeepCoding

## Instalación

### Variables de entorno
Copiar .env.example a .env y revisar los valores. 
Actualmente contiene los valores:

* JWT_SECRET => Clave privada para la generación del JWT
* JWT_EXPIRES_IN => Tiempo de validez del token generado

### Arranque del gestor de base de datos (puerto: 27020)
Arrancar el gestor de base de datos de MongoDB: [rutaInstalaciónMongoDB]./bin/mongod --dbpath ./data/db --directoryperdb --port 27020

### Para inicializar la Base de datos creando anuncios y usuarios
Desde el directirio raíz de la aplicación NodeJs: **npm run installDB**

### Para levantar la API en cluster (levanta tantos nodos como cores tiene la CPU)
Desde el directirio raíz de la aplicación NodeJs: **npm run cluster**


## Documentación uso de la API
El lenguage por defecto para los mensajes de error devuelvo por la API siempre será el inglés (*en*) aunque también se dispone del español (*es*).

### Usuarios:
* [POST] /apiv1/usuario?lang=*lang*
	* Creará un usuario con los datos incluidos en el body.
	* body: 
		* nombre: String => Nombre del usuario
		* email: String => Correo electrónico del usuario
		* clave: String => Clave del usuario
		
* [POST] /apiv1/authenticate?lang=*lang*
	* Si la autenticación es satisfactoria devolverá un JWT válido.
	* body:
		* email: String => Correo electrónico del usuario
		* clave: String => Clave del usuario

### Anuncios:
* [GET] /apiv1/anuncio?lang=*lang*
	* Devolverá el listado de anuncios según los filtros pasados en la query string.
	* header: 
		* x-access-token: Token de autenticación (JWT)
	* query: Parámetros de filtro de anuncios (todos opcionales)
		* tag: String => Nombre de tag válido
		* venta: Boolean => Indicador si es un anuncio de venta (true) u oferta (false)
		* nombre: String => Comienzo del nombre 
		* precioMin: Number => Precio mínimo de venta/oferta
		* precioMax: Number => Precio máximo de venta/oferta
		* start: Number => Número de anuncios iniciales que se omiten (para paginación)
		* limit: Number => Número de anuncios máximo que se devolveran
		* includeTotal: Number  => Indicador de si se incluirá en la respuesta el número total de anuncios después del filtrado (sin tener en cuenta el parámetro *limit*)

* [POST] /apiv1/anuncio?lang=*lang*
	* Creará un anuncio con los datos incluidos en el body.
	* header: 
		* x-access-token: Token de autenticación (JWT)
	* body: 
		* nombre: String => Nombre del anuncio
		* venta: Boolean => Indicador si es de venta (true) u oferta (false)
		* precio: Number => Precio (sin carácter de moneda)
		* foto: String => Ruta y nombre del archivo de foto asociado al anuncio
		* tags: [StringArray] => Lista de tags asociados al anuncio

* [GET] /apiv1/tagList?lang=*lang*
	* Devolverá el listado de tags disponibles para clasificar los anuncios.
	* header: 
		* x-access-token: Token de autenticación (JWT)

		
