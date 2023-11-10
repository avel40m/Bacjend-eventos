import express from 'express';
import morgan from 'morgan';
import conectarDB from './db.js';
import eventsRoutes from './Router/events.router.js'

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api',eventsRoutes);

conectarDB();

app.listen(3000,() => console.log('Servidor corriendo en el puerto 3000'));