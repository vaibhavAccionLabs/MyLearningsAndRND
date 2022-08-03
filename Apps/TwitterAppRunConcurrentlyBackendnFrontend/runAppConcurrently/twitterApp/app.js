const express = require('express');
const CORS = require('./api/middlewares/cors');

const twitterRoutes = require('./api/routes/tweet');

const app = express();

// Start DB
require('./config/db')();

app.use(CORS);

app.use(twitterRoutes);

module.exports = app;
