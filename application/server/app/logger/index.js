const winston = require('winston');
const moment = require('moment');
const _ = require('lodash');

module.exports = function (app, conf) {
  const logger = winston.createLogger({ transports: [] });

  if (conf.logging && conf.logging && conf.logging.winston) {
    let { level, transports } = conf.logging.winston;

    if (level && level.length > 0) {
      logger.level = level;
    }

    if (transports && transports.length > 0) {
      _.each(transports, transport => {
        let { type, options, active = false } = transport;
        let transportType = new winston.transports.Console(options);
        if (type) {
          switch (type) {
            case 'loggly':
              transportType = new winston.transports.Loggly(options);
              break;
            case 'file':
              transportType = new winston.transports.File(options);
              break;
            case 'http':
              transportType = new winston.transports.Http(options);
              break;
            case 'memory':
              transportType = new winston.transports.Memory(options);
              break;
            case 'console':
            default:
              transportType = new winston.transports.Console(options);
              break;
          }
        }
        if (active) {
          logger.add(transportType);
        }
      });
    }
  }

  return logger;
};
