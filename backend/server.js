/**
 * Servidor principal de RiegoSmart
 * Configuración de Express y rutas de todos los módulos del backend
 */

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// ---------------------- MIDDLEWARE ----------------------
// Parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS - Permitir solicitudes desde el frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// ---------------------- RUTAS PRINCIPALES ----------------------

// Ruta raíz - Health check
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'Bienvenido al backend de RiegoSmart',
        estado: 'servidor en funcionamiento',
        versión: '1.0.0'
    });
});

// ------------------------ RUTAS DE MÓDULOS --------------------------

// Rutas del módulo de Programación Lineal (PL)
// Importar cuando esté disponible: const rutasPL = require('./modulo-pl/routes');
// app.use('/api/pl', rutasPL);

// Rutas del módulo de Presión
// Importar cuando esté disponible: const rutasPresion = require('./modulo-presion/routes');
// app.use('/api/presion', rutasPresion);

// --------------------- MANEJO DE ERRORES ----------------------

// Ruta 404 - No encontrado
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        método: req.method,
        ruta: req.path
    });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor',
        status: err.status || 500
    });
});

// ------------------ INICIAR SERVIDOR -------------------

app.listen(port, () => {
    console.log(` Servidor RiegoSmart escuchando en http://localhost:${port}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'desarrollo'}\n`);
});