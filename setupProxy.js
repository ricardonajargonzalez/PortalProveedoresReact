

// Archivo: setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/mwcrm', // Ruta base de la API que deseas redirigir
    createProxyMiddleware({
      target: 'https://thinksmart.erpweb.mx', // La URL base del servidor destino
      changeOrigin: true, // Cambia el encabezado "Origin" de la solicitud al servidor destino
    })
  );
};