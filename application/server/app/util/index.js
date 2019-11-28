module.exports = function (app) {
  return {
    error: require('./error')(app),
    json: require('./json')(app),
    utils: require('./utils')(app)
  };
};
