const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Database connection
const url = process.env.LOCAL_DB;
mongoose.connect(url, {
  // useMongoClient: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

const startDB = () => {
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => console.log('Database is connected'));
};

module.exports = startDB;
