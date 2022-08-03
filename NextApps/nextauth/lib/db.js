// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// // Database connection
// const url = process.env.DATABASE_URL;
// mongoose.connect(url, {
//   // useMongoClient: true,
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   useCreateIndex: true,
// });

// const connection = mongoose.connection;

// export const connectToDatabase = async () => {
//   await connection.on(
//     'error',
//     console.error.bind(console, 'connection error:')
//   );
//   await connection.once('open', async () => {
//     console.log('Database is connected');
//     // await connection.db.collection('users', async function (err, collection) {
//     //   await collection.find({}).toArray(function (err, data) {
//     //     UserData = data;
//     //     console.log(data); // it will print your collection data
//     //   });
//     // });
//   });
//   // return UserData;
// };

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Database connection
const url = 'mongodb://127.0.0.1:27017/customerfeedback';
mongoose.connect(url, {
  // useMongoClient: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

const startDB = (cb) => {
  connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once('open', async () => {
    await connection.db.collection('users', (err, collection) => {
      collection.find({}).toArray(function (err, data) {
        cb && cb(data);
      });
    });
  });
};

module.exports = {
  db: startDB,
};
