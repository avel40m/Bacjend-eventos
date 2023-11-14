const express = require('express');
const morgan = require('morgan');
require('./db.js');
const eventsRoutes = require('./Router/events.router.js');
const customerRoutes = require('./Router/customer.router.js');
const passport = require('passport');
require('./Middleware/passport.js');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger-openapi.json');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/api',eventsRoutes);
app.use('/api',customerRoutes);

app.listen(3000,() => console.log('Servidor corriendo en el puerto 3000'));