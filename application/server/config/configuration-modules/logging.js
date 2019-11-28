module.exports = {
  logDirectory: '/srv/logs',
  winston: {
    /*
     * Logging Levels:
     * { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
     * */
    level: 'warn',
    transports: [
      {
        active: true,
        type: 'console',
        options: {
          colorize: true,
          level: 'silly'
        }
      }
    ]
  }
};
