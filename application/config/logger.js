/**Logger configuration Details */
var winston = require('winston');
var appRoot = require('app-root-path');
/* Levels
0: error
1: warn
2: info
3: verbose
4: debug
5: silly*/

var options = {
    info_file: {
      level: 'info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      colorize: false,
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.align()
      )
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: true,
      colorize: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    },
  };
var log_files = {};
/*if(process.env.NODE_ENV == 'production'){
  log_files = new winston.transports.File(options.info_file);
} else {
  log_files = new winston.transports.Console(options.console);
}*/
var logger = new winston.createLogger({
  transports: [
    //log_files = new winston.transports.File(options.info_file),
    log_files = new winston.transports.Console(options.console)
  ],
  exitOnError: false,
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
    //logger.error(message);
  },
};

module.exports = logger;
