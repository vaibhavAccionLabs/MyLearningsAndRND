const appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint, json } = format;

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), prettyPrint()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({
      filename: `${appRoot}/logs/error.log`,
      level: 'error',
      handleExceptions: true,
      maxsize: 5242880,
      colorize: false,
    }),
    new transports.File({
      filename: `${appRoot}/logs/combined.log`,
      handleExceptions: true,
      maxsize: 5242880,
      colorize: false,
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new transports.Console({
//       format: format.simple(),
//     })
//   );
// }

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: (message, encoding) => logger.info(message),
};

module.exports = logger;
