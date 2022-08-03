/* =========================================================
 *  CLOUTENDANCE BACKEND: APPLICATION FOR ONLINE ATTENDANCE
 *  BY: TEAM PYRITECREW.CO
 *  DEVELOPERS: TEZADA & KENTUCKY
 *  DATE: NOVEMBER 3, 2021
 * =========================================================
 */
const express = require('express');
const DatabaseConfig = require('./configs/db_connection_config');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const api = require('./routes/api_route');
const views = require('./routes/view_router');
const errorHandler = require('./helpers/error_handler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { corsOptions } = require('./configs/cors_config');

// =======================================================
// INITIALIZATION
// =======================================================
const app = express(); const port = process.env.API_PORT || 3030;
app.set('view engine', 'ejs'); app.set('views', './src/views');
// =======================================================
// DATABASE CONNECTIVITY
// =======================================================
DatabaseConfig.connect();

// =======================================================
// MIDDLEWARE
// =======================================================
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

// =======================================================
// ROUTES
// =======================================================
app.use('/', views);
app.use("/", api);


app.use(errorHandler);

// =======================================================
// LISTEN PORT
// =======================================================s
app.listen(port, () => console.log("CLOUTENDANCE API VERSION:1 ENDPOINT 2021 STARTED") );