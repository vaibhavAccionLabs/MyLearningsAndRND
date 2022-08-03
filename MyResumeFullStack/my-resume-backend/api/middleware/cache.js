const redis = require('redis');

const REDIS_PORT = process.env.port || 6379;

module.exports = {
  startCache: () => {
    const client = redis.createClient({ host: 'localhost', port: REDIS_PORT });
    client.on('error', function (er) {
      console.log('Redis server not connected.');
      //console.error(er.stack);
    });
    // Redis Auth
    client.auth(process.env.REDIS_PASSWORD, (err, data) => {
      if (err) console.log('Redis Auth fail.');
      if (data === 'OK') console.log('Redis Auth Successfull.');
    });
    client.on('connect', function () {
      console.log('Redis server connected.');
    });
    return client;
  },
};
