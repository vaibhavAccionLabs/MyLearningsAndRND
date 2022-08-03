const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const swaggerUi = require('swagger-ui-express');

const {
  logger: { stream },
  startCache,
} = require('./api/middleware');
// cache server
const redisClient = startCache();

const swaggerDocs = require('./config/swagger');
const CORS = require('./config/cors');
const NOTFOUND = require('./config/notfound');

// start App
const app = express();

// Start DB
require('./config/db')();

const productRoutes = require('./api/routes/products');
// const testRoutes = require('./api/routes/test-swagger');
const userRoutes = require('./api/routes/user');
const userDetailsRoutes = require('./api/routes/userDetails');
const profileRoutes = require('./api/routes/profile');

// Documentations configurations
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Logger to see the formated req,res, error on console
app.use(morgan('dev'));
// log files generator
app.use(morgan('combined', { stream }));

// # Give public access to the attachment files
app.use('/uploads', express.static('uploads'));

//bind the data to req body middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// # Middleware for handling CORS
app.use(CORS);

//Routes handle
app.use('/products', productRoutes);
// app.use('/test', testRoutes);

app.use('/user', userRoutes);
app.use('/user-details', userDetailsRoutes);
app.use('/profile', profileRoutes);

/** Testing Caching with redis */
//Set a response
function setResponse(userName, repos) {
  return `<h2>${userName} has ${repos} Github repos.</h2>`;
}

//Make a request to github
async function getRepos(req, res, next) {
  try {
    console.log('Fetching Data....');
    const { userName } = req.params;
    const response = await fetch(`https://api.github.com/users/${userName}`);
    const data = await response.json();
    const repos = data.public_repos;

    redisClient.setex(userName, 3600, repos);

    res.send(setResponse(userName, repos));
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

//Cache middleware
function cache(req, res, next) {
  const { userName } = req.params;
  redisClient.get(userName, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.send(setResponse(userName, data));
    } else {
      next();
    }
  });
}

app.get('/repos/:userName', cache, getRepos);

/** Testing Caching with redis */

// # Middleware check for non-existing routes
// # Not found routes
app.use(NOTFOUND);

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: error.message,
  });
});

module.exports = app;
