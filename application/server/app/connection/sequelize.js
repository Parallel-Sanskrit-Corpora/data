const _ = require('lodash');
const Sequelize = require('sequelize');
const momentTimezone = require('moment-timezone');

module.exports = function (app, conf) {
  const currentTimezoneOffset = momentTimezone().format('Z');
  const options = {
    host: conf.database.corpus.host,
    dialect: 'mysql',
    pool: {
      max: conf.database.corpus.connectionLimit,
      min: 0,
      idle: 0,
      acquire: 10000000
    },
    logging: false,
    useUTC: false,
    timezone: currentTimezoneOffset,
    dialectOptions: {
      multipleStatements: true
    },
    define: {
      timestamps: false
    }
  };

  app.logger.debug(`CURRENT TIMEZONE: ${currentTimezoneOffset}`);

  let sequelize = new Sequelize(
    conf.database.corpus.database,
    conf.database.corpus.user,
    conf.database.corpus.password,
    options
  );

  /**
   * Global hooks for all entities
   */
  sequelize.addHook('afterFind', function (entities) {
    let isNotArray = false;

    if (!entities || _.isNull(entities)) {
      return entities;
    }

    if (entities.constructor !== Array) {
      isNotArray = true;
      entities = [entities];
    }
    return isNotArray ? entities[0] : entities;
  });

  return sequelize;
};
