import express from 'express';
import conectarDB from './db.js';

const app = express();

conectarDB();

app.listen(3000,() => console.log('Servidor corriendo en el puerto 3000'));